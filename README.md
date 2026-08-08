# SkillSphere Learning Nexus

SkillSphere is a full-stack educational platform built with a **React (Vite + Tailwind)** frontend, a **Spring Boot** backend, and a **MySQL** database. It features secure JWT authentication, a comprehensive Student Dashboard, a powerful Admin Dashboard, and a dynamic Course Enrollment system.

## 🚀 Features Overview

### User Authentication & Security
- **Local & Google OAuth2 Login**: Secure JWT-based authentication supporting both standard email/password and Google Sign-In.
- **Password Reset Flow**: Complete forgot password functionality with secure token generation via email.
- **Role-Based Access**: Distinct features and views for `STUDENT` and `ADMIN` roles.

### 🎓 Student Dashboard
- **My Progress**: A highly visual, dynamic dashboard featuring interactive learning activity charts, course completion stats, and active course tracking.
- **My Skills**: A premium, visually distinct skills tracking grid that maps course progress to skill categories with dynamic icons and tiered proficiency badges (Beginner -> Master).
- **Profile Management**: Full CRUD capabilities for user details (Bio, Contact info, Social links, Avatar) communicating directly with the backend.
- **Settings**: Interactive preferences and appearance toggles (Light/Dark mode syncing) and secure password changing tools.

### ⚙️ Admin Dashboard
- **Analytics Overview**: Live platform statistics (Total Revenue, Active Students, Course Completions).
- **User Management**: View and manage all registered platform users.
- **Enrollment Tracking**: Live feed of recent student course enrollments and progress statuses.

---

## 🛠️ Tech Stack

```
skillsphere/
├── frontend/     React 18 + Vite + Tailwind CSS + Lucide Icons
├── backend/      Spring Boot 3 + Spring Security + JPA/Hibernate + JWT
└── database/     MySQL Schema & Seed scripts
```

---

## ⚙️ Setup & Installation

### 1. Database Setup (MySQL)
Make sure MySQL is running locally. You can create the database using the provided script, but **Hibernate will automatically create all tables** and our **DataSeeder** will automatically inject sample courses, users, and enrollments upon first launch!

```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend Configuration (Spring Boot)
1. Copy the example env file: `cp backend/.env.example backend/.env` and configure your database and API credentials inside `backend/.env`.
2. Run the application:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   *The API will start on **http://localhost:8080**.*

### 3. Frontend Configuration (React + Vite)
1. Copy the example env file: `cp frontend/.env.example frontend/.env` and add your `VITE_GOOGLE_CLIENT_ID`.
2. Install dependencies and start the dev server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The frontend starts on **http://localhost:5173** and proxies API requests to port 8080 automatically.*

---

## 🔗 Key API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Create new account |
| POST | `/api/auth/login` | Public | Standard login (Returns JWT) |
| POST | `/api/auth/google` | Public | Google OAuth login (Returns JWT) |
| POST | `/api/auth/forgot-password` | Public | Request a reset token |
| GET | `/api/courses` | Public | Fetch available courses |
| GET | `/api/users/profile` | Auth | Fetch active user profile |
| PUT | `/api/users/profile` | Auth | Update user profile data |
| GET | `/api/admin/stats` | Admin | Fetch platform analytics |
| POST | `/api/enrollments` | Auth | Enroll in a course |

---

## 📝 Developer Notes
- **Theme Support**: The UI fully supports Light and Dark modes. Toggling the theme from the Settings dashboard writes a `.light` class to the DOM and saves the preference to `localStorage`.
- **Auto-Seeding**: If the database is completely empty on startup, the `DataSeeder` class in the backend will automatically populate a diverse catalog of courses and an Admin account (`admin@gmail.com` / `superadmin`).
- **Security**: All passwords are automatically BCrypt hashed before persisting to the DB.
