# TaskBridge

**A full-stack platform connecting developers with real-world engineering challenges, opportunities, and rewards.**

TaskBridge helps companies, startups, and project posters publish engineering tasks while allowing developers and students to discover opportunities, submit applications, and demonstrate their skills through practical work.

**Live Demo:** https://task-bridge-mu-nine.vercel.app/  
**Backend API:** https://task-bridge-fwud.onrender.com  
**Repository:** https://github.com/AbhishekR49/Task-Bridge

---

## Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Access-token and refresh-token flow
- Protected routes and role-based authorization
- Separate Applicant and Poster experiences

### Task Management
- Posters can create, update, and manage engineering tasks
- Public task exploration
- Task status management: Open, In Progress, Completed, and Closed
- Poster dashboard for managing published tasks

### Application Management
- Applicants can apply to tasks with a message and resume
- Resume upload and validation
- Applicants can track their applications
- Posters can review applications and accept or reject candidates
- Accepting an applicant updates the task workflow

### Additional Features
- Role-specific dashboards and statistics
- Secure resume access for task posters
- ImageKit integration for file storage
- API validation and centralized error handling
- Security middleware, CORS configuration, and rate limiting

---

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, JavaScript, Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| HTTP Client | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| Validation | Zod |
| File Storage | ImageKit |
| Security | Helmet, CORS, express-rate-limit |
| Deployment | Vercel, Render |

---

## Application Workflow

1. A poster registers and creates an engineering task.
2. Applicants browse available tasks.
3. An applicant submits an application with a resume.
4. The poster reviews applications and accepts or rejects candidates.
5. When a candidate is accepted, the task moves to In Progress.
6. The poster marks the task as Completed when the work is finished.

---

## Local Setup

### Prerequisites

- Node.js
- MongoDB database
- ImageKit account

### 1. Clone the repository

```bash
git clone https://github.com/AbhishekR49/Task-Bridge.git
cd Task-Bridge
```

### 2. Configure the backend

Install backend dependencies from the project root:

```bash
npm install
```

Create a `.env` file in the backend root directory:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_jwt_secret
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_DAYS=7

CLIENT_ORIGINS=http://localhost:5173

IK_URL=your_imagekit_url
IK_PUBLIC_KEY=your_imagekit_public_key
IK_PRIVATE_KEY=your_imagekit_private_key
```

Start the backend:

```bash
npm run dev
```

### 3. Configure the frontend

Open another terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend should now be available at `http://localhost:5173`.

---

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Refresh authentication |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Get authenticated user |
| GET | `/api/tasks` | Explore tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/my-tasks` | Get poster's tasks |
| GET | `/api/tasks/:id` | Get task details |
| PATCH | `/api/tasks/:id` | Update a task |
| PATCH | `/api/tasks/:id/close` | Close a task |
| PATCH | `/api/tasks/:id/complete` | Complete a task |
| POST | `/api/application/task/:id` | Apply to a task |
| GET | `/api/application/my-applications` | Get applicant's applications |
| GET | `/api/dashboard` | Dashboard data |

**Note:** Some endpoints require authentication and specific user roles.

---

## Security Notes

- Keep `.env` files out of version control.
- Never expose private API keys or JWT secrets.
- Configure production environment variables separately.
- Resume files are accessed through an authorization-protected endpoint.

---

## Author

**Abhishek Raghuwanshi**

B.Tech Computer Science and Engineering

- GitHub: https://github.com/AbhishekR49

---

*TaskBridge — Turning engineering challenges into opportunities.*
