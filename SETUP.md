# Full-Stack Task Manager Application

A modern task management application built with React/Next.js frontend and Python FastAPI backend.

## Tech Stack Used

### Frontend
- **React 19** - UI library with hooks
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **SWR** - Data fetching and caching (optional for backend integration)

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Lightweight database (can be upgraded to PostgreSQL)
- **Pydantic** - Data validation
- **JWT** - Authentication tokens
- **CORS** - Cross-origin request handling

### Key Libraries
- **python-jwt** - JWT token generation and verification
- **python-multipart** - Form data parsing
- **python-dotenv** - Environment variable management

## Project Structure

```
project/
├── frontend/
│   ├── app/
│   │   ├── page.tsx (Main dashboard)
│   │   ├── auth/
│   │   │   └── page.tsx (Authentication pages)
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   ├── TodoInput.tsx
│   │   ├── TodoItem.tsx
│   │   ├── FilterBar.tsx
│   │   ├── Calendar.tsx
│   │   ├── ScheduleInput.tsx
│   │   ├── ScheduleChart.tsx
│   │   ├── ScheduleTable.tsx
│   │   ├── ProfilePage.tsx
│   │   └── dashboard/
│   │       └── DashboardSummary.tsx
│   ├── lib/
│   │   └── api.ts (API integration utilities)
│   └── package.json
│
└── backend/
    ├── main.py (FastAPI application)
    ├── models.py (SQLAlchemy database models)
    ├── schemas.py (Pydantic data schemas)
    ├── database.py (Database configuration)
    ├── requirements.txt
    ├── .env
    └── run.sh
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Tasks (Todos)
- `GET /api/todos` - Get all tasks for authenticated user
- `POST /api/todos` - Create new task
- `PUT /api/todos/{todo_id}` - Update task
- `DELETE /api/todos/{todo_id}` - Delete task

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Health
- `GET /api/health` - Health check endpoint

## Database Models

### User
- id (Primary Key)
- email (Unique)
- password
- created_at
- Relationships: todos, profile

### Todo
- id (Primary Key)
- user_id (Foreign Key)
- text
- completed (Boolean)
- priority (low/medium/high)
- due_date
- due_time
- is_important (Boolean)
- created_at
- Relationships: user

### Profile
- id (Primary Key)
- user_id (Foreign Key)
- name
- email
- bio
- image (URL)
- Relationships: user

## Features

### Dashboard
- Overview of all tasks
- Day-wise statistics
- Date selector for filtering
- Pie chart showing task distribution
- Progress tracking

### Tasks Manager
- Add new tasks with priority and due date/time
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Search and filter tasks
- Star important tasks
- Clear completed or all tasks

### Calendar View
- Interactive calendar
- View tasks organized by date
- Click dates to see tasks for that day

### Daily Schedule
- Time-based task scheduling
- Visual pie chart of task distribution
- Task table sorted by time
- Quick task input for specific date

### Notification Center
- Real-time overdue task alerts
- Upcoming deadline reminders
- Priority-based notifications

### Important Works
- Dedicated section for starred tasks
- Quick access to critical items

### Profile Management
- User profile view
- Edit profile information
- Upload or change profile image
- Manage bio

## Setup Instructions

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Create `.env` file:
```
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///./taskmanager.db
```

4. Run the server:
```bash
python main.py
# or
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Authentication Flow

1. User registers/signs up with email and password
2. Backend validates and creates new user account
3. User profile is automatically created
4. JWT token is returned and stored in localStorage
5. Token is sent in Authorization header for all subsequent requests
6. Backend validates token on each protected endpoint
7. User redirected to login if token is invalid or expired

## Data Persistence

- **Frontend**: Uses localStorage for temporary data storage
- **Backend**: Uses SQLite database with SQLAlchemy ORM
- **Authentication**: JWT tokens stored in localStorage
- **Tasks**: Persisted in database with user association

## Security Features

- Password-based authentication with JWT tokens
- User isolation (users can only access their own data)
- CORS configuration for cross-origin requests
- Input validation with Pydantic schemas
- Protected API endpoints requiring authentication

## Running Both Frontend and Backend

### Option 1: Terminal Tabs
```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate
python main.py

# Terminal 2: Frontend
npm run dev
```

### Option 2: Concurrent with npm-run-all
```bash
npm install -g npm-run-all
npm run dev:all
```

(Add this to frontend package.json)
```json
{
  "scripts": {
    "dev": "next dev",
    "dev:backend": "cd backend && python main.py",
    "dev:all": "npm-run-all --parallel dev dev:backend"
  }
}
```

## Future Enhancements

- PostgreSQL database for production
- Task categories and tags
- Recurring tasks
- Task reminders via email
- Collaborative tasks and sharing
- Dark mode toggle
- Mobile app (React Native)
- Real-time updates with WebSockets
- Advanced analytics and reporting
- File attachments for tasks

## Troubleshooting

### CORS Errors
- Ensure backend is running on the correct port
- Check CORS configuration in backend/main.py

### Authentication Issues
- Clear localStorage and try again
- Ensure .env variables are set correctly
- Check token expiration (default 30 minutes)

### Database Errors
- Delete taskmanager.db to reset database
- Ensure SQLite is installed

### Frontend Won't Connect to Backend
- Check if backend is running at http://localhost:8000
- Verify NEXT_PUBLIC_API_URL environment variable
