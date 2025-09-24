# TaskFlow - Professional Task Management Frontend

A comprehensive Next.js frontend application for task management with authentication, built to work with the FastAPI backend.

## Features

- 🔐 **JWT Authentication** - Secure login/signup with token management
- 👤 **User Profile Management** - Update profile information
- ✅ **Task Management** - Complete CRUD operations for tasks with priority and due dates
- 📝 **Notes System** - Organize personal notes with categories and favorites
- 📰 **Posts Management** - Create and manage posts with tags and status tracking
- 🔍 **Advanced Search & Filtering** - Real-time search with debouncing across all entities
- 📊 **Dashboard Analytics** - Visual overview of tasks, notes, and posts statistics
- 🎨 **Professional SaaS Design** - Modern, gradient-based UI with glassmorphism effects
- 🔄 **Real-time Updates** - Automatic refresh after operations
- 🛡️ **Comprehensive Error Handling** - User-friendly error messages and recovery
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🚀 **Performance Optimized** - Debounced search, lazy loading, and efficient state management

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui
- **Authentication**: JWT with localStorage
- **State Management**: React hooks with custom API client
- **TypeScript**: Full type safety throughout

## Getting Started

### Prerequisites

- Node.js 18+ 
- Your FastAPI backend running (see backend documentation)

### Installation

1. **Clone and install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update `.env.local` with your FastAPI backend URL:
   \`\`\`
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (health check)
│   ├── dashboard/         # Main dashboard with analytics
│   ├── login/            # Authentication pages
│   ├── notes/            # Notes management page
│   ├── posts/            # Posts management page
│   ├── profile/          # User profile page
│   ├── settings/         # Settings page
│   ├── signup/           # User registration page
│   └── tasks/            # Task management page
├── components/            # Reusable UI components
│   ├── auth/             # Authentication forms and logic
│   ├── health/           # API status monitoring
│   ├── layout/           # Navigation and layout components
│   ├── notes/            # Note CRUD components
│   ├── posts/            # Post CRUD components
│   ├── profile/          # Profile management components
│   ├── tasks/            # Task management components
│   └── ui/               # Base UI components (shadcn/ui)
├── hooks/                # Custom React hooks
│   ├── use-auth.ts       # Authentication state management
│   ├── use-debounce.ts   # Search debouncing
│   ├── use-notes.ts      # Notes data management
│   ├── use-posts.ts      # Posts data management
│   └── use-tasks.ts      # Tasks data management
├── lib/                  # Utility libraries and services
│   ├── api-client.ts     # Centralized HTTP client
│   ├── auth.ts           # Authentication service
│   ├── notes.ts          # Notes API service
│   ├── posts.ts          # Posts API service
│   ├── tasks.ts          # Tasks API service
│   ├── user.ts           # User profile service
│   └── utils.ts          # Utility functions
└── public/               # Static assets and images
\`\`\`

## API Integration

The frontend integrates with your FastAPI backend through a centralized API client that handles:

- **Authentication**: JWT token management and automatic logout on 401
- **Error Handling**: Consistent error responses and user feedback
- **Request/Response**: Type-safe API calls with proper TypeScript interfaces
- **Health Monitoring**: Backend connectivity status

### Supported Endpoints

All FastAPI endpoints from your backend are supported:

#### Authentication
- `POST /auth/login` - User authentication
- `POST /auth/signup` - User registration

#### User Management
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

#### Tasks Management
- `GET /tasks` - Get tasks with filtering (status, priority, search)
- `POST /tasks` - Create new task
- `GET /tasks/{id}` - Get single task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

#### Notes Management
- `GET /notes` - Get notes with filtering (category, favorites, search)
- `POST /notes` - Create new note
- `GET /notes/{id}` - Get single note
- `PUT /notes/{id}` - Update note
- `DELETE /notes/{id}` - Delete note

#### Posts Management
- `GET /posts` - Get posts with filtering (status, search)
- `POST /posts` - Create new post
- `GET /posts/{id}` - Get single post
- `PUT /posts/{id}` - Update post
- `DELETE /posts/{id}` - Delete post

#### System
- `GET /health` - Health check and API status

## Key Features

### Authentication Flow
1. User logs in with email/password
2. JWT token stored in localStorage
3. Token included in all API requests
4. Automatic logout on token expiration
5. Protected routes redirect to login

### Entity Management

#### Tasks
- **Create**: Add new tasks with title, description, priority, and due dates
- **Read**: View all tasks with advanced filtering and search
- **Update**: Edit task details, change status, and update priorities
- **Delete**: Remove tasks with confirmation dialog
- **Filter**: By status (pending, in_progress, completed), priority (low, medium, high), and text search
- **Statistics**: Real-time task completion metrics and progress tracking

#### Notes
- **Create**: Add personal notes with rich content and categories
- **Read**: Browse notes with category and favorite filtering
- **Update**: Edit note content, change categories, and toggle favorites
- **Delete**: Remove notes with confirmation
- **Filter**: By category (general, work, personal, ideas, etc.) and favorite status
- **Categories**: Organize notes with predefined categories for better structure

#### Posts
- **Create**: Create posts with content, tags, and status management
- **Read**: View posts with status-based filtering and search
- **Update**: Edit post content, manage tags, and change publication status
- **Delete**: Remove posts with confirmation
- **Filter**: By status (draft, published, archived) and text search
- **Analytics**: Track view counts and engagement metrics

### Search & Filtering
- **Debounced Search**: 300ms delay for optimal performance
- **Multiple Filters**: Status, priority, and text search
- **Active Filter Display**: Visual badges showing applied filters
- **Quick Clear**: One-click filter reset
- **Real-time Results**: Instant updates as you type

## Environment Configuration

### Development
\`\`\`bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
\`\`\`

### Production
\`\`\`bash
NEXT_PUBLIC_API_BASE_URL=https://your-fastapi-backend.com
\`\`\`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
1. Build the application: `npm run build`
2. Set environment variables
3. Deploy the `out` directory

## CORS Configuration

Ensure your FastAPI backend allows requests from your frontend domain:

\`\`\`python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
\`\`\`

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint + Prettier for code formatting
- Tailwind CSS for styling
- Component-based architecture

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if FastAPI backend is running
   - Verify NEXT_PUBLIC_API_BASE_URL is correct
   - Check CORS configuration in backend

2. **Authentication Issues**
   - Clear localStorage and try logging in again
   - Check JWT token expiration
   - Verify backend authentication endpoints

3. **Build Errors**
   - Ensure all environment variables are set
   - Check TypeScript errors: `npm run type-check`
   - Verify all dependencies are installed

### Health Check
Visit `/settings` page to check API connectivity status and configuration.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
