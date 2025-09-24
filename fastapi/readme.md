# Dashboard API - FastAPI Backend

A comprehensive backend API built with FastAPI for user management and task operations. This single-file application provides JWT-based authentication, user profile management, and CRUD operations on tasks with search and filtering capabilities.

## Features

- ✅ JWT-based Authentication (Login/Signup)
- ✅ User Profile Management (View/Update)
- ✅ Task CRUD Operations
- ✅ Search and Filter Tasks
- ✅ Password Hashing (bcrypt)
- ✅ Database Integration (PostgreSQL/Neon DB)
- ✅ Docker Support
- ✅ Comprehensive Error Handling
- ✅ Input Validation
- ✅ CORS Support

## Quick Start

### Local Development

1. **Clone and Setup**
   ```bash
   # Install dependencies
   pip install -r requirements.txt
   
   # Set environment variables
   export DATABASE_URL="your_neon_db_connection_string"
   export SECRET_KEY="your-super-secret-key"
   
   # Run the application
   python main.py
   ```

2. **Access the API**
   - API: http://localhost:8000
   - Interactive Documentation: http://localhost:8000/docs
   - Alternative Documentation: http://localhost:8000/redoc

### Docker Deployment

1. **Build Docker Image**
   ```bash
   docker build -t dashboard-api .
   ```

2. **Run with Docker**
   ```bash
   docker run -p 8000:8000 \
     -e DATABASE_URL="your_neon_db_connection_string" \
     -e SECRET_KEY="your-super-secret-key" \
     dashboard-api
   ```

3. **For Hugging Face Deployment**
   ```bash
   # Tag for deployment
   docker tag dashboard-api your-registry/dashboard-api:latest
   docker push your-registry/dashboard-api:latest
   ```

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | None | ✅ |
| `SECRET_KEY` | JWT signing secret | "your-secret-key-change-in-production" | ✅ |

## Database Schema

### Users Table
```sql
users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Tasks Table
```sql
tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    priority VARCHAR(10) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## API Endpoints

### Base URL
```
https://your-deployment-url.com
```

### Authentication

#### 1. Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "full_name": "John Doe"
}
```

**Response (201):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "created_at": "2025-09-25T10:00:00.000Z"
}
```

#### 2. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### User Profile

#### 3. Get Profile
```http
GET /user/profile
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "created_at": "2025-09-25T10:00:00.000Z"
}
```

#### 4. Update Profile
```http
PUT /user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Response (200):**
```json
{
  "id": 1,
  "email": "johnsmith@example.com",
  "full_name": "John Smith",
  "created_at": "2025-09-25T10:00:00.000Z"
}
```

### Task Management

#### 5. Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "priority": "high"
}
```

**Response (201):**
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "pending",
  "priority": "high",
  "created_at": "2025-09-25T10:00:00.000Z",
  "updated_at": "2025-09-25T10:00:00.000Z"
}
```

#### 6. Get All Tasks (with filtering)
```http
GET /tasks?status=pending&priority=high&search=documentation
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): `pending`, `in_progress`, `completed`
- `priority` (optional): `low`, `medium`, `high`
- `search` (optional): Search in title and description

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "status": "pending",
    "priority": "high",
    "created_at": "2025-09-25T10:00:00.000Z",
    "updated_at": "2025-09-25T10:00:00.000Z"
  }
]
```

#### 7. Get Single Task
```http
GET /tasks/1
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "pending",
  "priority": "high",
  "created_at": "2025-09-25T10:00:00.000Z",
  "updated_at": "2025-09-25T10:00:00.000Z"
}
```

#### 8. Update Task
```http
PUT /tasks/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "status": "in_progress",
  "priority": "high"
}
```

**Response (200):**
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "in_progress",
  "priority": "high",
  "created_at": "2025-09-25T10:00:00.000Z",
  "updated_at": "2025-09-25T10:15:00.000Z"
}
```

#### 9. Delete Task
```http
DELETE /tasks/1
Authorization: Bearer <token>
```

**Response (204):** No content

### Health Check

#### 10. Health Check
```http
GET /health
```

**Response (200):**
```json
{
  "status": "healthy",
  "database": "connected"
}
```

## Data Models

### User Models

**UserCreate (Request):**
```json
{
  "email": "string (email format, required)",
  "password": "string (min 6 chars, required)",
  "full_name": "string (required, min 1 char)"
}
```

**UserLogin (Request):**
```json
{
  "email": "string (email format, required)",
  "password": "string (required)"
}
```

**UserUpdate (Request):**
```json
{
  "email": "string (email format, optional)",
  "full_name": "string (optional)"
}
```

**UserResponse:**
```json
{
  "id": "integer",
  "email": "string",
  "full_name": "string",
  "created_at": "datetime (ISO 8601)"
}
```

### Task Models

**TaskCreate (Request):**
```json
{
  "title": "string (required, min 1 char)",
  "description": "string (optional)",
  "priority": "string (optional, enum: low|medium|high, default: medium)"
}
```

**TaskUpdate (Request):**
```json
{
  "title": "string (optional, min 1 char)",
  "description": "string (optional)",
  "status": "string (optional, enum: pending|in_progress|completed)",
  "priority": "string (optional, enum: low|medium|high)"
}
```

**TaskResponse:**
```json
{
  "id": "integer",
  "title": "string",
  "description": "string|null",
  "status": "string (enum: pending|in_progress|completed)",
  "priority": "string (enum: low|medium|high)",
  "created_at": "datetime (ISO 8601)",
  "updated_at": "datetime (ISO 8601)"
}
```

### Authentication Models

**Token:**
```json
{
  "access_token": "string (JWT token)",
  "token_type": "string (always 'bearer')"
}
```

## Error Responses

### Common Error Format
```json
{
  "detail": "Error description"
}
```

### HTTP Status Codes
- **200**: Success
- **201**: Created
- **204**: No Content
- **400**: Bad Request (validation errors, duplicate email, etc.)
- **401**: Unauthorized (invalid credentials, expired token)
- **404**: Not Found (resource doesn't exist)
- **422**: Unprocessable Entity (validation errors)
- **500**: Internal Server Error
- **503**: Service Unavailable (database connection issues)

## Frontend Integration Guide

### Authentication Flow
1. **Sign Up**: `POST /auth/signup` → Get user data
2. **Login**: `POST /auth/login` → Get JWT token
3. **Store Token**: Save `access_token` in localStorage/sessionStorage
4. **Add to Headers**: Include `Authorization: Bearer <token>` in all authenticated requests
5. **Handle Expiry**: Redirect to login on 401 responses

### Task Dashboard Implementation
```javascript
// Example fetch with authentication
const fetchTasks = async (filters = {}) => {
  const token = localStorage.getItem('access_token');
  const params = new URLSearchParams(filters);
  
  const response = await fetch(`/tasks?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (response.status === 401) {
    // Redirect to login
    window.location.href = '/login';
    return;
  }
  
  return response.json();
};
```

### Search and Filter Implementation
```javascript
// Frontend search/filter state
const [filters, setFilters] = useState({
  search: '',
  status: '',
  priority: ''
});

// Apply filters
const filteredUrl = `/tasks?${new URLSearchParams(
  Object.entries(filters).filter(([_, value]) => value)
)}`;
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with automatic salt generation
- **Input Validation**: Pydantic models with regex validation
- **SQL Injection Prevention**: Parameterized queries
- **CORS Protection**: Configurable cross-origin policies
- **Error Handling**: Secure error messages without sensitive data exposure

## Deployment Notes

### For Hugging Face Spaces
1. Use the provided Dockerfile
2. Set environment variables in Hugging Face settings
3. The application will automatically initialize database tables on startup
4. Health check endpoint available for monitoring

### Database Setup (Neon DB)
1. Create a Neon DB account and database
2. Copy the connection string
3. Set as `DATABASE_URL` environment variable
4. Tables will be created automatically on first run

## File Structure
```
project/
├── main.py           # Single FastAPI application file
├── requirements.txt  # Python dependencies
├── Dockerfile       # Docker configuration
└── README.md        # This documentation
```

## Contributing

This is a single-file application designed for simplicity and easy deployment. For larger features or modifications, consider splitting into modules while maintaining the Docker compatibility.