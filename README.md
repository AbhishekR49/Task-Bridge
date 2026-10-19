# Task-Bridge

A full-stack platform designed to connect people who post tasks with applicants interested in completing them.

**Task-Bridge is currently under development.** The backend project is set up, connected to MongoDB, and the user registration API is working.

## Current Features

- User registration API
- Input validation using Zod
- Password hashing using bcrypt
- Role selection: applicant or poster
- Duplicate email handling
- MongoDB integration using Mongoose
- Security middleware using Helmet
- Request rate limiting
- Basic health-check endpoint

## Planned Features

- User login and token-based authentication
- Access and refresh token management
- Role-based authorization
- Task creation, editing, browsing, and status management
- Applications with messages and resume uploads
- Accepting one applicant and automatically rejecting other applications
- Search, filtering, and pagination
- Applicant and poster dashboards
- Automated API tests
- React frontend and deployment

## Tech Stack

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose

**Validation and Security**

- Zod
- bcrypt
- Helmet
- express-rate-limit
- CORS

**Testing**

- Jest
- Supertest

**Planned Frontend**

- React
- Vite

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB connection

### 1. Clone the repository

```bash
git clone https://github.com/AbhishekR49/Task-Bridge.git
cd Task-Bridge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and configure the environment variables required by the application.

### 4. Start the development server

```bash
npm run dev
```

The backend currently runs on port `3000` in the local development setup.

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint             | Purpose              |
| ------ | -------------------- | -------------------- |
| GET    | `/health`            | Check backend status |
| POST   | `/api/auth/register` | Register a new user  |

### Register a user

**Request**

`POST /api/auth/register`

```json
{
  "name": "Example User",
  "email": "example@example.com",
  "password": "ExamplePass123!",
  "role": "applicant"
}
```

The `role` field accepts `applicant` or `poster`. If omitted, the default role is `applicant`.

A successful registration returns the user's ID, name, email, and role. The password is not included in the response.

## Project Structure

```text
Task-Bridge/
├── server.js
├── package.json
└── src/
    ├── app.js
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── services/
    ├── tests/
    └── validators/
```

## Development Status

Task-Bridge is an active learning and portfolio project. Features will be added incrementally, with an emphasis on API design, authentication, security, database modeling, testing, and full-stack integration.

## Author

**Abhishek Raghuwanshi**

GitHub: [AbhishekR49](https://github.com/AbhishekR49)
