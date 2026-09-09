# Task Manager

A full-stack task management application with role-based access for administrators and users. The application supports task assignment, progress tracking, dashboards, profile management, file uploads, and report exports.

## Features

### Authentication
- User registration and login
- JWT authentication with HTTP-only cookies
- Role-based access for Admin and User
- Profile management
- Profile image upload

### Task Management
- Create, view, update, and delete tasks
- Assign tasks to one or more users
- Priority levels: Low, Medium, High
- Status tracking: Pending, In Progress, Completed
- Todo checklist with automatic progress calculation
- Task filtering by status
- Task attachments

### Dashboards
- Admin dashboard with task and priority statistics
- User dashboard with personal task statistics
- Recent task overview

### Reports
- Export task reports to Excel
- Export user reports to Excel

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Redux Toolkit
- Redux Persist
- React Router
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- ExcelJS

## Project Structure

```text
Task-Manager/
├── api-tests/
│   ├── auth.http
│   ├── users.http
│   ├── tasks.http
│   └── reports.http
├── backend/
│   ├── controller/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env.example
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- VS Code
- REST Client extension for API testing (optional)

### 1. Clone the repository

```bash
git clone https://github.com/manassingha/Task-Manager
cd Task-Manager
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_JOIN_CODE=123456
FRONT_END_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The API runs on:

```text
http://localhost:3000
```

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Demo Credentials

### Admin

```text
Email: admin@gmail.com
Password: admin@gmail.com
```

### User

```text
Email: rahul.sharma@taskmanager.com
Password: Rahul@123
```

## API Endpoints

Base URL:

```text
http://localhost:3000/api
```

| Module | Method | Endpoint |
|---|---|---|
| Auth | POST | `/auth/sign-up` |
| Auth | POST | `/auth/sign-in` |
| Auth | GET | `/auth/user-profile` |
| Auth | PUT | `/auth/update-profile` |
| Auth | POST | `/auth/upload-image` |
| Users | GET | `/users/get-users` |
| Users | GET | `/users/:id` |
| Tasks | POST | `/tasks/create` |
| Tasks | GET | `/tasks/` |
| Tasks | GET | `/tasks/dashboard-data` |
| Tasks | GET | `/tasks/user-dashboard-data` |
| Tasks | GET | `/tasks/:id` |
| Tasks | PUT | `/tasks/:id` |
| Tasks | DELETE | `/tasks/:id` |
| Tasks | PUT | `/tasks/:id/status` |
| Tasks | PUT | `/tasks/:id/todo` |
| Reports | GET | `/reports/export/tasks` |
| Reports | GET | `/reports/export/users` |

## API Testing

The `api-tests` directory contains REST Client request files covering the active backend endpoints:

```text
api-tests/
├── auth.http
├── users.http
├── tasks.http
└── reports.http
```

Open any `.http` file in VS Code with the REST Client extension and use **Send Request** to execute the request.

For protected endpoints, sign in first so the authentication cookie is available to subsequent requests.

## Authorization

| Role | Access |
|---|---|
| Admin | User management, task creation/deletion, admin dashboard, reports |
| User | Assigned tasks, user dashboard, task updates permitted by assignment |

## Notes

- Keep `backend/.env` out of version control.
- Uploaded files are stored locally in `backend/uploads/`.
- `backend/.env.example` contains placeholders only.

## License

This project is for learning, development, and portfolio purposes.
