# KodingKaksha AI

Full-stack role-based learning and coding platform built with React + Node.js + MongoDB.

## What The App Includes

### Landing + Core UX
- Public home page with product sections and CTA flow
- Login flow with JWT token handling via cookies
- Role-aware dashboard shell with sidebar navigation
- Responsive UI across dashboard, notes, and coding modules

###  Learning Module
- Subject-wise notes listing
- Subject capsule filtering
- Notes search UI
- Rich-text notes detail page
- Notes create and edit using Jodit editor
- Notes delete flow
- Subject creation from notes form

### Coding Questions Module
- Question bank with:
- Topic filter
- Difficulty filter
- Search
- Question detail/problem page
- Dynamic tags + difficulty badges
- Question create/upload form (title, topic, difficulty, tags, rich content, testcase table)
- Question delete action from list

### Online IDE + Evaluation
- Monaco-based code editor
- Language switching (`javascript`, `python`, `java`, `cpp`)
- Custom input + output run section
- Submit flow with testcase verdict chips
- Demo compile endpoint integration on problem page
- RapidAPI compile integration for direct code run
- Resizable split-panel layout (desktop)

### Practice IDE + AI Chat
- Standalone practice IDE route
- Integrated AI chatbox for code explanation/help
- Chat markdown rendering support

### Admin & User Management
- Users table with role/search filters
- Toggle read-only access
- Edit user modal
- Delete user flow
- Create user form (role + read-only settings)

## Role Model

Supported roles:
- `student`
- `lecturer`
- `admin`
- `superAdmin`

Current UI behavior:
- Protected routes require authentication token
- Admin/Lecturer/SuperAdmin get management actions (notes/questions admin actions)
- Student has learner-oriented access (notes + problem solving + practice IDE)

## Frontend Routes

- `/` Home
- `/login` Login
- `/dashboard`
- `/dashboard/admin-panel`
- `/dashboard/notes`
- `/dashboard/create-notes`
- `/dashboard/edit-notes/:id`
- `/dashboard/questions`
- `/dashboard/upload-question`
- `/dashboard/notes/:id`
- `/question/:id`
- `/practice-ide`

## Backend API Modules

Base API router: `/api`

- Health:
- `GET /api/health`

- Auth:
- `POST /api/auth/login`

- Users:
- `GET /api/users/allusers`
- `POST /api/users/register-user`
- `PUT /api/users/update/:id`
- `DELETE /api/users/delete/:id`

- Subjects:
- `POST /api/subject/create`
- `GET /api/subject/all`
- `DELETE /api/subject/:id`

- Courses:
- `GET /api/course/all`
- `POST /api/course/upload-course`
- `PUT /api/course/update/:id`
- `DELETE /api/course/remove/:id`
- `GET /api/course/course-details/:id`

- Questions:
- `POST /api/questions/add`
- `GET /api/questions/all`
- `GET /api/questions/details/:id`
- `PUT /api/questions/update/:id`
- `DELETE /api/questions/delete/:id`
- `POST /api/questions/compile`
- `POST /api/questions/demo-compile`

## Tech Stack

Frontend:
- React (Vite)
- React Router
- Redux Toolkit
- Axios
- Monaco Editor
- Jodit Editor
- React Toastify
- React Markdown

Backend:
- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcryptjs
- CORS

## Project Structure

```text
KodingKasha_AI/
  client/   # React frontend
  server/   # Express API + MongoDB models/controllers
```

## Local Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd KodingKasha_AI

cd client && npm install
cd ../server && npm install
```

### 2. Configure Environment Variables

`client/.env`
```env
VITE_API_URL=http://localhost:5001/api
VITE_RAPID_API_KEY=your_rapidapi_key
```

`server/.env`
```env
PORT=5001
NODE_ENV=development
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAPID_API_KEY=your_rapidapi_key
CORS_URL=http://localhost:5173
# or CORS_ORIGINS=http://localhost:5173,https://your-frontend-domain.vercel.app
```

### 3. Run

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm run dev
```

## Scripts

Client:
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

Server:
- `npm run dev`
- `npm start`

## Deployment Notes

- Frontend and backend are Vercel-friendly.
- Set `VITE_API_URL` to deployed backend API base (including `/api`).
- Configure backend `CORS_URL` or `CORS_ORIGINS` with frontend domain(s).
- Add all required env vars in deployment dashboard before build/start.
