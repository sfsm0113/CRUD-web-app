---
title: TaskFlow Pro API
emoji: ✅
colorFrom: blue
colorTo: purple
sdk: docker
app_port: 8000
pinned: false
license: mit
---

# TaskFlow Pro API - FastAPI Backend

A comprehensive backend API built with FastAPI for modern task management with multi-entity support. This robust application provides JWT-based authentication, user profile management, and complete CRUD operations for Tasks, Notes, and Posts with advanced search and filtering capabilities.

## 🚀 Features

### Core Functionality
- 🔐 **JWT Authentication** - Secure login/signup with token-based auth
- 👤 **User Profile Management** - Complete profile CRUD operations
- ✅ **Task Management** - Full CRUD with priority, status, and due dates
- 📝 **Notes System** - Personal notes with categories and favorites
- 📰 **Posts Management** - Content creation with tags and status tracking

### Technical Features
- 🔍 **Advanced Search & Filtering** - Real-time search across all entities
- 🔒 **Password Security** - bcrypt hashing with salt
- 🗄️ **Database Integration** - PostgreSQL with Neon DB cloud support
- 🐳 **Docker Ready** - Complete containerization setup
- 🛡️ **Comprehensive Error Handling** - Detailed error responses
- ✨ **Input Validation** - Pydantic models with type safety
- 🌐 **CORS Support** - Cross-origin requests enabled
- 📚 **Auto Documentation** - Interactive API docs with Swagger/OpenAPI
- 🏥 **Health Monitoring** - System status and database connectivity checks

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
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Notes Table
```sql
notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(50) DEFAULT 'general',
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Posts Table
```sql
posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'draft',
    tags TEXT[] DEFAULT '{}',
    view_count INTEGER DEFAULT 0,
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

### Notes Management

#### 10. Create Note
```http
POST /notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Meeting Notes",
  "content": "Important discussion points from today's meeting",
  "category": "work"
}
```

**Response (201):**
```json
{
  "id": 1,
  "title": "Meeting Notes",
  "content": "Important discussion points from today's meeting",
  "category": "work",
  "is_favorite": false,
  "created_at": "2025-09-25T10:00:00.000Z",
  "updated_at": "2025-09-25T10:00:00.000Z"
}
```

#### 11. Get All Notes (with filtering)
```http
GET /notes?category=work&is_favorite=true&search=meeting
Authorization: Bearer <token>
```

Query Parameters:
- `category` (optional): Filter by category (general, work, personal, ideas, etc.)
- `is_favorite` (optional): Filter by favorite status (true/false)
- `search` (optional): Search in title and content

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Meeting Notes",
    "content": "Important discussion points",
    "category": "work",
    "is_favorite": true,
    "created_at": "2025-09-25T10:00:00.000Z",
    "updated_at": "2025-09-25T10:00:00.000Z"
  }
]
```

#### 12. Get Single Note
```http
GET /notes/1
Authorization: Bearer <token>
```

#### 13. Update Note
```http
PUT /notes/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Meeting Notes",
  "is_favorite": true
}
```

#### 14. Delete Note
```http
DELETE /notes/1
Authorization: Bearer <token>
```

**Response (204):** No content

### Posts Management

#### 15. Create Post
```http
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "status": "published",
  "tags": ["tech", "programming", "fastapi"]
}
```

**Response (201):**
```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "status": "published",
  "tags": ["tech", "programming", "fastapi"],
  "view_count": 0,
  "created_at": "2025-09-25T10:00:00.000Z",
  "updated_at": "2025-09-25T10:00:00.000Z"
}
```

#### 16. Get All Posts (with filtering)
```http
GET /posts?status=published&search=programming
Authorization: Bearer <token>
```

Query Parameters:
- `status` (optional): Filter by status (draft, published, archived)
- `search` (optional): Search in title and content

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "My First Blog Post",
    "content": "This is the content of my blog post...",
    "status": "published",
    "tags": ["tech", "programming", "fastapi"],
    "view_count": 15,
    "created_at": "2025-09-25T10:00:00.000Z",
    "updated_at": "2025-09-25T10:00:00.000Z"
  }
]
```

#### 17. Get Single Post
```http
GET /posts/1
Authorization: Bearer <token>
```

#### 18. Update Post
```http
PUT /posts/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Blog Post Title",
  "status": "published"
}
```

#### 19. Delete Post
```http
DELETE /posts/1
Authorization: Bearer <token>
```

**Response (204):** No content

### Health Check

#### 20. Health Check
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
  "due_date": "datetime (ISO 8601)|null",
  "created_at": "datetime (ISO 8601)",
  "updated_at": "datetime (ISO 8601)"
}
```

### Note Models

**NoteCreate (Request):**
```json
{
  "title": "string (required, min 1 char)",
  "content": "string (optional)",
  "category": "string (optional, default: general)"
}
```

**NoteUpdate (Request):**
```json
{
  "title": "string (optional, min 1 char)",
  "content": "string (optional)",
  "category": "string (optional)",
  "is_favorite": "boolean (optional)"
}
```

**NoteResponse:**
```json
{
  "id": "integer",
  "title": "string",
  "content": "string|null",
  "category": "string",
  "is_favorite": "boolean",
  "created_at": "datetime (ISO 8601)",
  "updated_at": "datetime (ISO 8601)"
}
```

### Post Models

**PostCreate (Request):**
```json
{
  "title": "string (required, min 1 char)",
  "content": "string (required, min 1 char)",
  "status": "string (optional, enum: draft|published|archived, default: draft)",
  "tags": "array of strings (optional)"
}
```

**PostUpdate (Request):**
```json
{
  "title": "string (optional, min 1 char)",
  "content": "string (optional, min 1 char)",
  "status": "string (optional, enum: draft|published|archived)",
  "tags": "array of strings (optional)"
}
```

**PostResponse:**
```json
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "status": "string (enum: draft|published|archived)",
  "tags": "array of strings",
  "view_count": "integer",
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

## API Summary

This FastAPI application provides a complete backend solution for a task management system with multi-entity support:

### 🎯 Core Entities

- **Users**: Authentication and profile management
- **Tasks**: Todo items with priority, status, and due dates
- **Notes**: Personal notes with categories and favorites
- **Posts**: Blog-style content with tags and status tracking

### 🔧 Key Features

- JWT-based authentication with secure password hashing
- Complete CRUD operations for all entities
- Advanced search and filtering capabilities
- Real-time health monitoring
- Comprehensive error handling
- Auto-generated API documentation
- Docker-ready deployment

### 📊 API Endpoints Summary

- **Authentication**: 2 endpoints (signup, login)
- **User Management**: 2 endpoints (get/update profile)
- **Tasks**: 5 endpoints (full CRUD + list with filters)
- **Notes**: 5 endpoints (full CRUD + list with filters)
- **Posts**: 5 endpoints (full CRUD + list with filters)
- **System**: 1 endpoint (health check)

**Total: 20 API endpoints** providing comprehensive functionality for a modern task management application.

## Contributing

This is a single-file application designed for simplicity and easy deployment. For larger features or modifications, consider splitting into modules while maintaining the Docker compatibility.

## License

This project is licensed under the MIT License - see the project files for details.