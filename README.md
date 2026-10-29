# Task-Bridge

Task-Bridge is a task marketplace platform where task posters can publish paid tasks and applicants can apply by submitting a message and resume.

The project is being developed as a full-stack application using the MERN stack.

## Features

### Authentication and Authorization
- User registration and login.
- JWT-based access tokens and refresh-token rotation.
- Secure password hashing with bcrypt.
- Role-based authorization for applicants and posters.
- Protected API endpoints.
- Session management and logout.

### Task Management
- Create, view, update, and close tasks.
- Browse tasks with search, filtering, and pagination.
- Track task statuses: `open`, `in_progress`, `completed`, and `closed`.
- Restrict task modifications to the owning poster.

### Applications
- Applicants can apply to open tasks.
- Resume uploads using ImageKit.
- Posters can view applications for their tasks.
- Posters can accept or reject pending applications.
- Accepting an application automatically rejects other pending applications for that task.
- Task status changes to `in_progress` when an application is accepted.

### Dashboards
- **Poster dashboard:** Task counts by status and total applications received.
- **Applicant dashboard:** Total applications and counts by pending, accepted, and rejected status.
- Dashboard endpoints are protected by authentication and role-based authorization.

### Security and Validation
- Request validation using Zod.
- HTTP security headers with Helmet.
- API rate limiting.
- MongoDB data modeling with Mongoose.
- Centralized error handling.

## Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT and bcrypt
- Zod
- Multer and ImageKit
- Jest and Supertest (testing setup)

**Frontend**
- React
- Tailwind CSS

The frontend is planned for the next development phase.

## API Endpoints

All endpoints use the base URL `http://localhost:3000` during local development.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/api/auth/...` | Authentication operations |
| GET | `/api/tasks` | Browse tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/:id` | Get task details |
| PATCH | `/api/tasks/:id` | Update a task |
| PATCH | `/api/tasks/:id/closed` | Close a task |
| POST | `/api/applications/tasks/:id` | Submit an application with a resume |
| GET | `/api/applications/tasks/:id` | View applications for a task |
| PATCH | `/api/applications/:applicationId/status` | Accept or reject an application |
| GET | `/api/dashboard/poster` | Get poster dashboard statistics |
| GET | `/api/dashboard/applicant` | Get applicant dashboard statistics |

Protected endpoints require an access token in the `Authorization` header:

`Authorization: Bearer <access_token>`

Application submission uses `multipart/form-data` with a `message` field and a `resume` file.

Check the route files for the exact authentication endpoints and request formats.

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas or another appropriately configured MongoDB deployment
- An ImageKit account for resume uploads

### Installation

Clone the repository:

```bash
git clone https://github.com/AbhishekR49/Task-Bridge.git
cd Task-Bridge
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root and configure the environment variables required by the application.

Keep all secrets out of GitHub. Use `.env.example` as a template, and never commit your actual `.env` file.

Start the development server:

```bash
npm run dev
```

The server runs on port `3000` by default, unless configured otherwise.

### Available Scripts

```bash
npm run dev
npm start
npm test
```

- `npm run dev` starts the development server.
- `npm start` starts the server.
- `npm test` runs the configured Jest test suite.

## Current Development Status

- Core authentication and authorization implemented.
- Task management APIs implemented.
- Application submission and resume-upload workflow implemented.
- Application acceptance and rejection workflow implemented.
- Poster and applicant dashboard APIs implemented and manually tested.
- Automated backend testing and additional security verification are next.
- React frontend integration and deployment are planned.

## Project Goal

Build a functional, secure, and maintainable task marketplace that demonstrates practical backend engineering, authentication, file uploads, database operations, and full-stack development.
