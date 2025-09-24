from fastapi import FastAPI, HTTPException, Depends, status, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from typing import Optional, List
import logging
from contextlib import asynccontextmanager
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/dbname")

# Log the database connection (without exposing the full URL for security)
if DATABASE_URL.startswith("postgresql://"):
    db_host = DATABASE_URL.split("@")[1].split("/")[0] if "@" in DATABASE_URL else "localhost"
    logger.info(f"Using database host: {db_host}")
else:
    logger.info("Using default database configuration")

# Database connection
def get_db_connection():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        raise HTTPException(status_code=500, detail="Database connection failed")

# Initialize database tables
def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            full_name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Tasks table (sample entity)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(20) DEFAULT 'pending',
            priority VARCHAR(10) DEFAULT 'medium',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    conn.commit()
    cursor.close()
    conn.close()

# Lifespan event handler
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_db()
    logger.info("Database initialized successfully")
    yield
    # Shutdown (if needed)
    logger.info("Application shutdown")

# Initialize FastAPI
app = FastAPI(
    title="Dashboard API",
    description="A comprehensive backend API for user management and task operations",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Pydantic models
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: str = Field(..., min_length=1)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    created_at: datetime

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    priority: Optional[str] = Field("medium", pattern="^(low|medium|high)$")

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1)
    description: Optional[str] = None
    status: Optional[str] = Field(None, pattern="^(pending|in_progress|completed)$")
    priority: Optional[str] = Field(None, pattern="^(low|medium|high)$")

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    priority: str
    created_at: datetime
    updated_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str

# Utility functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    # Log token information for debugging (remove in production)
    logger.info(f"JWT Token created for user: {data.get('sub')}")
    logger.info(f"Token expires at: {expire}")
    logger.info(f"Token payload: {to_encode}")
    logger.info(f"Generated token: {encoded_jwt[:50]}...")  # Only show first 50 chars for security
    
    return encoded_jwt

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            logger.error("No email found in JWT payload")
            raise credentials_exception
            
        # Check token expiration
        exp = payload.get("exp")
        if exp is None or datetime.utcnow() > datetime.utcfromtimestamp(exp):
            logger.error("Token has expired")
            raise credentials_exception
            
    except JWTError as e:
        logger.error(f"JWT decode error: {e}")
        raise credentials_exception
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT id, email, full_name, created_at FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if user is None:
            logger.error(f"User not found in database: {email}")
            raise credentials_exception
            
        logger.info(f"User authenticated successfully: {email}")
        return dict(user)
        
    except Exception as e:
        logger.error(f"Database error during user lookup: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

# API Routes

@app.get("/")
async def root():
    return {"message": "Dashboard API is running", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    try:
        # Test database connection
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        cursor.close()
        conn.close()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}

# Authentication endpoints
@app.post("/auth/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    # Check if user already exists
    cursor.execute("SELECT id FROM users WHERE email = %s", (user.email,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    cursor.execute(
        "INSERT INTO users (email, password_hash, full_name) VALUES (%s, %s, %s) RETURNING *",
        (user.email, hashed_password, user.full_name)
    )
    new_user = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    
    return UserResponse(**dict(new_user))

@app.post("/auth/login", response_model=Token)
async def login(user: UserLogin):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM users WHERE email = %s", (user.email,))
    db_user = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if not db_user or not verify_password(user.password, db_user["password_hash"]):
        logger.warning(f"Failed login attempt for email: {user.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    logger.info(f"Successful login for user: {user.email}")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user["email"]}, expires_delta=access_token_expires
    )
    
    # Log successful authentication
    logger.info(f"Access token generated for user: {user.email}")
    
    return {"access_token": access_token, "token_type": "bearer"}

# User profile endpoints
@app.get("/user/profile", response_model=UserResponse)
async def get_profile(current_user: dict = Depends(get_current_user)):
    return UserResponse(**current_user)

@app.put("/user/profile", response_model=UserResponse)
async def update_profile(user_update: UserUpdate, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    update_fields = []
    update_values = []
    
    if user_update.full_name is not None:
        update_fields.append("full_name = %s")
        update_values.append(user_update.full_name)
    
    if user_update.email is not None:
        # Check if email is already taken
        cursor.execute("SELECT id FROM users WHERE email = %s AND id != %s", (user_update.email, current_user["id"]))
        if cursor.fetchone():
            cursor.close()
            conn.close()
            raise HTTPException(status_code=400, detail="Email already in use")
        update_fields.append("email = %s")
        update_values.append(user_update.email)
    
    if not update_fields:
        cursor.close()
        conn.close()
        return UserResponse(**current_user)
    
    update_fields.append("updated_at = CURRENT_TIMESTAMP")
    update_values.append(current_user["id"])
    
    query = f"UPDATE users SET {', '.join(update_fields)} WHERE id = %s RETURNING *"
    cursor.execute(query, update_values)
    updated_user = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    
    return UserResponse(**dict(updated_user))

# Task management endpoints
@app.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(task: TaskCreate, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute(
        "INSERT INTO tasks (user_id, title, description, priority) VALUES (%s, %s, %s, %s) RETURNING *",
        (current_user["id"], task.title, task.description, task.priority)
    )
    new_task = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    
    return TaskResponse(**dict(new_task))

@app.get("/tasks", response_model=List[TaskResponse])
async def get_tasks(
    current_user: dict = Depends(get_current_user),
    status_filter: Optional[str] = Query(None, pattern="^(pending|in_progress|completed)$"),
    priority_filter: Optional[str] = Query(None, pattern="^(low|medium|high)$"),
    search: Optional[str] = Query(None, min_length=1)
):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    query = "SELECT * FROM tasks WHERE user_id = %s"
    params = [current_user["id"]]
    
    if status_filter:
        query += " AND status = %s"
        params.append(status_filter)
    
    if priority_filter:
        query += " AND priority = %s"
        params.append(priority_filter)
    
    if search:
        query += " AND (title ILIKE %s OR description ILIKE %s)"
        search_term = f"%{search}%"
        params.extend([search_term, search_term])
    
    query += " ORDER BY created_at DESC"
    
    cursor.execute(query, params)
    tasks = cursor.fetchall()
    cursor.close()
    conn.close()
    
    return [TaskResponse(**dict(task)) for task in tasks]

@app.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task(task_id: int, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM tasks WHERE id = %s AND user_id = %s", (task_id, current_user["id"]))
    task = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return TaskResponse(**dict(task))

@app.put("/tasks/{task_id}", response_model=TaskResponse)
async def update_task(task_id: int, task_update: TaskUpdate, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    # Check if task exists and belongs to user
    cursor.execute("SELECT * FROM tasks WHERE id = %s AND user_id = %s", (task_id, current_user["id"]))
    existing_task = cursor.fetchone()
    
    if not existing_task:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_fields = []
    update_values = []
    
    if task_update.title is not None:
        update_fields.append("title = %s")
        update_values.append(task_update.title)
    
    if task_update.description is not None:
        update_fields.append("description = %s")
        update_values.append(task_update.description)
    
    if task_update.status is not None:
        update_fields.append("status = %s")
        update_values.append(task_update.status)
    
    if task_update.priority is not None:
        update_fields.append("priority = %s")
        update_values.append(task_update.priority)
    
    if not update_fields:
        cursor.close()
        conn.close()
        return TaskResponse(**dict(existing_task))
    
    update_fields.append("updated_at = CURRENT_TIMESTAMP")
    update_values.append(task_id)
    
    query = f"UPDATE tasks SET {', '.join(update_fields)} WHERE id = %s RETURNING *"
    cursor.execute(query, update_values)
    updated_task = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    
    return TaskResponse(**dict(updated_task))

@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(task_id: int, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = %s AND user_id = %s", (task_id, current_user["id"]))
    
    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found")
    
    conn.commit()
    cursor.close()
    conn.close()

# Debug endpoint to inspect JWT tokens (remove in production)
@app.get("/debug/token-info")
async def get_token_info(current_user: dict = Depends(get_current_user), credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Debug endpoint to inspect JWT token information.
    WARNING: Remove this endpoint in production!
    """
    try:
        # Decode the token to get payload information
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Get token expiration time
        exp_timestamp = payload.get("exp")
        exp_datetime = datetime.fromtimestamp(exp_timestamp) if exp_timestamp else None
        
        token_info = {
            "token_payload": payload,
            "current_user": {
                "id": current_user.get("id"),
                "email": current_user.get("email"),
                "full_name": current_user.get("full_name")
            },
            "token_expires_at": exp_datetime.isoformat() if exp_datetime else None,
            "token_is_valid": True,
            "raw_token": credentials.credentials[:50] + "..."  # Only show first 50 chars
        }
        
        logger.info(f"Token info requested by user: {current_user.get('email')}")
        return token_info
        
    except JWTError as e:
        logger.error(f"JWT decode error: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")

# Debug endpoint to decode any JWT token (remove in production)
@app.post("/debug/decode-token")
async def decode_token(token: str):
    """
    Debug endpoint to decode any JWT token.
    WARNING: Remove this endpoint in production!
    """
    try:
        # Decode without verification for debugging
        unverified_payload = jwt.get_unverified_claims(token)
        
        # Try to decode with verification
        try:
            verified_payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            is_valid = True
            verification_error = None
        except JWTError as e:
            verified_payload = None
            is_valid = False
            verification_error = str(e)
        
        # Get expiration info
        exp_timestamp = unverified_payload.get("exp")
        exp_datetime = datetime.fromtimestamp(exp_timestamp) if exp_timestamp else None
        is_expired = exp_datetime < datetime.utcnow() if exp_datetime else False
        
        return {
            "unverified_payload": unverified_payload,
            "verified_payload": verified_payload,
            "is_valid": is_valid,
            "is_expired": is_expired,
            "expires_at": exp_datetime.isoformat() if exp_datetime else None,
            "verification_error": verification_error,
            "raw_token": token[:50] + "..."
        }
        
    except Exception as e:
        logger.error(f"Token decode error: {e}")
        raise HTTPException(status_code=400, detail=f"Invalid token format: {str(e)}")

# Health check endpoint
@app.get("/health")
async def health_check():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        cursor.close()
        conn.close()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Service unavailable")

if __name__ == "__main__":
    import uvicorn
    
    # Configuration for development
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    debug = os.getenv("DEBUG", "true").lower() == "true"
    
    print(f"Starting FastAPI server on {host}:{port}")
    print(f"Debug mode: {debug}")
    print("API documentation available at: http://localhost:8000/docs")
    
    if debug:
        # Use import string for reload functionality
        uvicorn.run(
            "main:app",  # Import string instead of app object
            host=host,
            port=port,
            reload=True,
            log_level="info"
        )
    else:
        # Use app object for production
        uvicorn.run(
            app,
            host=host,
            port=port,
            log_level="warning"
        )