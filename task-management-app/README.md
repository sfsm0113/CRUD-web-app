# TaskFlow - Professional Task Management Frontend

A comprehensive Next.js frontend application for task management with authentication, built to work with the FastAPI backend.

## Features

- 🔐 **JWT Authentication** - Secure login/signup with token management
- 👤 **User Profile Management** - Update profile information
- ✅ **Task CRUD Operations** - Create, read, update, delete tasks
- 🔍 **Advanced Search & Filtering** - Real-time search with debouncing
- 📊 **Task Statistics** - Visual overview of task completion
- 🎨 **Professional Dark Theme** - Modern, responsive design
- 🔄 **Real-time Updates** - Automatic refresh after operations
- 🛡️ **Error Handling** - Comprehensive error management
- 📱 **Responsive Design** - Works on all device sizes

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
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Authentication pages
│   ├── profile/          # User profile page
│   ├── settings/         # Settings page
│   └── tasks/            # Task management page
├── components/            # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── health/           # API status components
│   ├── layout/           # Layout components
│   ├── profile/          # Profile components
│   ├── tasks/            # Task management components
│   └── ui/               # Base UI components (shadcn/ui)
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── api-client.ts     # Centralized API client
│   ├── auth.ts           # Authentication service
│   ├── tasks.ts          # Task service
│   └── user.ts           # User service
└── public/               # Static assets
\`\`\`

## API Integration

The frontend integrates with your FastAPI backend through a centralized API client that handles:

- **Authentication**: JWT token management and automatic logout on 401
- **Error Handling**: Consistent error responses and user feedback
- **Request/Response**: Type-safe API calls with proper TypeScript interfaces
- **Health Monitoring**: Backend connectivity status

### Supported Endpoints

All FastAPI endpoints from your backend are supported:

- `POST /auth/login` - User authentication
- `POST /auth/signup` - User registration  
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `GET /tasks` - Get tasks with filtering
- `POST /tasks` - Create new task
- `GET /tasks/{id}` - Get single task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task
- `GET /health` - Health check

## Key Features

### Authentication Flow
1. User logs in with email/password
2. JWT token stored in localStorage
3. Token included in all API requests
4. Automatic logout on token expiration
5. Protected routes redirect to login

### Task Management
- **Create**: Add new tasks with title, description, priority
- **Read**: View all tasks with filtering and search
- **Update**: Edit task details and change status
- **Delete**: Remove tasks with confirmation dialog
- **Filter**: By status, priority, and text search
- **Statistics**: Real-time task completion metrics

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
