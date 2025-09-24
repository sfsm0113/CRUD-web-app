# TaskFlow Pro - Full-Stack Task Management System

A modern, professional SaaS application built with FastAPI backend and Next.js frontend, featuring comprehensive task management with multi-entity support including Tasks, Notes, and Posts.

## 🎯 Project Overview

TaskFlow Pro is a complete full-stack web application that transforms a simple task management system into a professional SaaS platform. The project consists of two main components working together to provide a seamless user experience:

- **Backend API** (FastAPI) - Robust REST API with JWT authentication
- **Frontend Dashboard** (Next.js) - Modern, responsive web application

## 🚀 Features

### 🔐 Authentication & Security

- JWT-based authentication with secure password hashing
- Protected routes and middleware
- Automatic token refresh and session management
- Role-based access control

### 📋 Multi-Entity Management

- **Tasks**: Complete todo management with priorities, statuses, and due dates
- **Notes**: Personal note-taking with categories and favorites
- **Posts**: Blog-style content creation with tags and status tracking

### 🎨 User Experience

- Modern, responsive design with dark/light theme support
- Intuitive dashboard with real-time updates
- Advanced search and filtering capabilities
- Mobile-first design approach

### 🛠️ Technical Features

- Real-time data synchronization
- Comprehensive error handling
- Input validation and sanitization
- Docker containerization
- Cloud deployment ready (Hugging Face Spaces)

## 📁 Project Structure

```text
TaskFlow-Pro/
├── README.md                    # This overview document
├── Dockerfile                   # Backend Docker configuration
├── main.py                      # FastAPI backend entry point
├── requirements.txt             # Python dependencies
├── fastapi/                     # Backend documentation
│   └── readme.md               # Detailed API documentation
└── task-management-app/         # Frontend Next.js application
    ├── README.md               # Frontend documentation
    ├── package.json            # Node.js dependencies
    ├── next.config.mjs         # Next.js configuration
    ├── app/                    # Next.js app router
    │   ├── api/               # API routes
    │   ├── dashboard/         # Dashboard pages
    │   ├── login/             # Authentication pages
    │   └── ...                # Other app pages
    ├── components/            # React components
    │   ├── auth/             # Authentication components
    │   ├── tasks/            # Task management components
    │   ├── notes/            # Notes components
    │   ├── posts/            # Posts components
    │   └── ui/               # Shared UI components
    ├── hooks/                # Custom React hooks
    ├── lib/                  # Utility libraries
    └── styles/               # CSS styles
```

## 🏗️ Architecture

### Backend (FastAPI)

- **Framework**: FastAPI with Python 3.11+
- **Database**: PostgreSQL (Neon DB cloud)
- **Authentication**: JWT tokens with bcrypt password hashing
- **API Design**: RESTful architecture with OpenAPI documentation
- **Deployment**: Docker containerization

### Frontend (Next.js)

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **State Management**: React hooks with custom API client
- **Authentication**: Token-based with automatic redirect handling

## 🛠️ Technology Stack

### Backend Technologies

- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Robust relational database
- **Pydantic** - Data validation and serialization
- **bcrypt** - Password security
- **python-jose** - JWT token handling
- **Docker** - Containerization

### Frontend Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons
- **date-fns** - Date manipulation utilities

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Python 3.11+
- PostgreSQL database (or Neon DB account)
- Docker (optional, for containerized deployment)

### Backend Setup

1. **Environment Setup**
   ```bash
   cd fastapi-crud
   pip install -r requirements.txt
   ```

2. **Environment Variables**
   ```env
   DATABASE_URL=your_postgresql_connection_string
   SECRET_KEY=your-jwt-secret-key
   ```

3. **Run Backend**
   ```bash
   python main.py
   # API available at http://localhost:8000
   # Documentation at http://localhost:8000/docs
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd task-management-app
   npm install
   # or
   pnpm install
   ```

2. **Environment Variables**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Run Frontend**
   ```bash
   npm run dev
   # or
   pnpm dev
   # Application available at http://localhost:3000
   ```

### Docker Deployment

1. **Backend Docker**
   ```bash
   docker build -t taskflow-api .
   docker run -p 8000:8000 -e DATABASE_URL="..." -e SECRET_KEY="..." taskflow-api
   ```

2. **Frontend Docker** (if needed)
   ```bash
   cd task-management-app
   docker build -t taskflow-frontend .
   docker run -p 3000:3000 taskflow-frontend
   ```

## 📊 API Overview

The backend provides 20 comprehensive API endpoints:

### Authentication (2 endpoints)

- `POST /auth/signup` - User registration
- `POST /auth/login` - User authentication

### User Management (2 endpoints)

- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

### Tasks Management (5 endpoints)

- `POST /tasks` - Create task
- `GET /tasks` - List tasks (with filtering)
- `GET /tasks/{id}` - Get single task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

### Notes Management (5 endpoints)

- `POST /notes` - Create note
- `GET /notes` - List notes (with filtering)
- `GET /notes/{id}` - Get single note
- `PUT /notes/{id}` - Update note
- `DELETE /notes/{id}` - Delete note

### Posts Management (5 endpoints)

- `POST /posts` - Create post
- `GET /posts` - List posts (with filtering)
- `GET /posts/{id}` - Get single post
- `PUT /posts/{id}` - Update post
- `DELETE /posts/{id}` - Delete post

### System (1 endpoint)

- `GET /health` - Health check

## 🌟 Key Features Implemented

### ✅ Authentication System

- Secure JWT-based authentication
- Password hashing with bcrypt
- Token expiration and refresh handling
- Protected route middleware

### ✅ CRUD Operations

- Complete Create, Read, Update, Delete operations
- Real-time data synchronization
- Optimistic UI updates
- Error handling with user feedback

### ✅ Advanced Filtering

- Search across multiple fields
- Status and priority filtering
- Category-based organization
- Tag-based content filtering

### ✅ Professional UI/UX

- Modern dashboard design
- Responsive mobile layout
- Dark/light theme support
- Intuitive navigation

### ✅ Data Management

- Three-entity system (Tasks, Notes, Posts)
- Relational data modeling
- Data validation and sanitization
- Automatic timestamps

## 🚢 Deployment Options

### Hugging Face Spaces (Recommended)

- Backend ready for Hugging Face deployment
- Includes proper Docker configuration
- Environment variable support
- Automatic health monitoring

### Traditional Cloud Platforms

- Compatible with AWS, Google Cloud, Azure
- Docker containers for easy deployment
- Scalable architecture design
- Database connection pooling

### Self-Hosted

- Complete Docker setup included
- Environment configuration flexibility
- Local development support
- Production-ready configuration

## 📖 Documentation

- **Backend API**: See `fastapi/readme.md` for detailed API documentation
- **Frontend Guide**: See `task-management-app/README.md` for frontend setup and usage
- **API Documentation**: Available at `/docs` endpoint when running the backend

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Notes

### Database Schema

The application automatically creates the necessary database tables on startup:

- `users` - User authentication and profiles
- `tasks` - Task management data
- `notes` - Personal notes storage
- `posts` - Blog-style content

### Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens have configurable expiration
- CORS is properly configured
- Input validation on all endpoints

### Performance Features

- Efficient database queries with proper indexing
- Pagination support for large datasets
- Optimized API response times
- Frontend component lazy loading

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure DATABASE_URL is correctly set
2. **CORS Errors**: Check frontend API URL configuration
3. **Authentication Issues**: Verify JWT secret key consistency
4. **Port Conflicts**: Ensure ports 3000 and 8000 are available

### Development Tips

- Use the interactive API docs at `/docs` for testing
- Check browser console for frontend errors
- Monitor backend logs for API issues
- Use database admin tools for data inspection

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with FastAPI and Next.js
- UI components from shadcn/ui
- Icons from Lucide React
- Database hosting by Neon DB

---

**TaskFlow Pro** - Transforming task management into a professional SaaS experience.