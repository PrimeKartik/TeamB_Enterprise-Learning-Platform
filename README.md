# Enterprise Learning Platform with Skill & Career Guidance System

Enterprise Learning Platform with Skill & Career Guidance System is a full-stack e-learning and career-guidance platform that takes a student all the way from **enrolling in a course** to **being job-ready** — course delivery, AI-assisted learning, skill assessment, verifiable certification, coding practice, contests, a role-based career roadmap, a resume builder, a jobs board, and a powerful admin back-office, all in one product.

Built with **React (Vite + Tailwind CSS)** on the frontend and **Spring Boot 3 + Spring Security + JPA/Hibernate** on the backend, backed by **MySQL**.

## 🌐 Live Demo
**[Enterprise Learning Platform with Skill & Career Guidance System Live Demo](http://skill-sphere-wheat.vercel.app/)**

---

## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database](#-database)
- [Team](#-team)
- [License](#-license)

---

## 🚀 Features

### 🔐 Authentication & Security
- Email/password registration & login, plus **Google OAuth2 Sign-In**
- **JWT**-based stateless authentication (`jjwt`) with a custom `JwtAuthFilter`
- Forgot-password flow with OTP verification and secure, time-boxed reset tokens (emailed via Spring Mail)
- Role-based access control for `STUDENT` and `ADMIN`
- Passwords hashed with **BCrypt** before persistence

### 🎓 Student Experience
| Module | What it does |
|---|---|
| **Dashboard / My Progress** | Learning-velocity analytics — enrolled courses, average completion %, courses completed, active courses, plus overall and course-wise progress charts (Recharts), driven live by the backend with empty/retry states |
| **Courses & Lessons** | Browse, search & filter courses; module/lesson player with progress tracking, notes, bookmarks, wishlist, and reviews |
| **AI Tutor Panel** | In-course AI chat panel (`AITutorPanel`) powered by **Google Gemini**, with suggested follow-up questions while watching a lesson |
| **Assessments** | One AI-assisted assessment per enrolled course, unlocked after enrollment, with a timer and instant results feeding certificate eligibility |
| **Module Practice & Quizzes** | Per-module practice questions and quizzes with attempt tracking and reset support |
| **Coding Practice** | Standalone coding questions with an in-browser code editor, automated test-case submission, a difficulty-tiered progress tracker, badges, and a global leaderboard |
| **Contests** | Timed coding contests with registration, live leaderboard, contest-specific discussions, and an auto-issued, verifiable **contest certificate** |
| **Certificates** | Auto-generated on passing an assessment; preview, PDF download (OpenPDF), public verification by certificate ID, and a personal certificate library |
| **Career Roadmap** | Role-based roadmaps (Full Stack Developer, Java Backend Developer, Frontend Developer, Python Developer, Cloud Engineer) with a 12-week submission-based curriculum, weekly status (Completed / In Progress / Locked), and a detailed 7-day study & coding plan per week |
| **Resume Builder** | Build a resume in-app (education, skills, projects, experience, achievements) with a live **ATS score widget**, preview, and PDF export |
| **Jobs & Internships** | Searchable, filterable jobs board with a details view and one-click apply using the platform profile/resume |
| **Profile** | Personal info, skills, social links, achievements, and learning statistics, fully editable |
| **Settings** | Account settings, notification preferences, security (password change), and Light/Dark theme toggle (persisted to `localStorage`) |
| **Notifications** | In-app notification center with read/read-all support |
| **Support & Help** | Ticketing system — students raise a complaint/ticket with category, priority, description and an optional screenshot, and track its status (Open / In Progress / Resolved) |

### ⚙️ Admin Dashboard
- **Analytics overview** — platform-wide KPIs (revenue, active students, completions)
- **Revenue analytics** — monthly trends, per-course breakdown, transaction history, CSV export
- **Student enrollment analytics** — enrollment charts, per-student progress, filters
- **Course, module & category management** — full CRUD for courses, modules, quizzes, categories, and instructors
- **Certificate management** — issue, view, and revoke certificates
- **Jobs management** — manage postings shown on the student Jobs board
- **Complaints/support management** — review and resolve student tickets
- **Audit logs** — track administrative actions
- **Report export** — CSV export of users and courses

---

## 🛠️ Tech Stack

```
Enterprise Learning Platform with Skill & Career Guidance System/
├── frontend/   React 18 + Vite + Tailwind CSS
│               React Router · Recharts · Framer Motion · Axios
│               jsPDF / html2canvas · qrcode.react · react-toastify
├── backend/    Spring Boot 3.3.1 (Java)
│               Spring Security + JWT (jjwt) · Spring Data JPA/Hibernate
│               Spring Mail · Google API Client (OAuth2) · OpenPDF
└── database/   MySQL — schema, seed data & migration scripts
```

**AI:** Google **Gemini API** powers the AI Tutor chat panel and assistant responses.

---

## 📁 Project Structure

```
├── backend/
│   └── src/main/java/com/Enterprise Learning Platform with Skill & Career Guidance System/
│       ├── controller/    # 29 REST controllers (auth, courses, roadmap, contests, admin, ...)
│       ├── model/         # JPA entities (User, Course, Certificate, Contest, CareerRoadmap, ...)
│       ├── repository/    # Spring Data repositories
│       ├── service/       # Business logic (incl. GeminiService for AI chat)
│       ├── security/      # JWT filter, JwtUtil, Google token verifier
│       ├── dto/            # Request/response DTOs
│       ├── config/         # Security & app configuration
│       └── exception/      # Global exception handling
├── frontend/
│   └── src/
│       ├── pages/student/  # dashboard, courses, roadmaps, resume, jobs, contests, coding, ...
│       ├── pages/admin/    # admin dashboard, management screens, revenue, enrollments
│       ├── components/     # shared UI components
│       ├── context/        # React context (auth, theme, etc.)
│       ├── services/       # API service layer (axios)
│       └── routes/         # route definitions & guards
└── database/                # schema.sql, seed.sql, incremental migration scripts
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- Java 17+ and Maven
- MySQL 8+

### 1. Database
Hibernate auto-creates all tables and a `DataSeeder` seeds sample courses, users, and an admin account on first run. To pre-create the schema manually instead:
```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend (Spring Boot)
```bash
cd backend
cp .env.example .env   # fill in your DB, JWT, Google & Gemini credentials
./mvnw spring-boot:run
```
Runs on **http://localhost:8080**.

### 3. Frontend (React + Vite)
```bash
cd frontend
cp .env.example .env   # add your VITE_GOOGLE_CLIENT_ID
npm install
npm run dev
```
Runs on **http://localhost:5173** and proxies API calls to the backend on port 8080.

---

## 🔑 Environment Variables

**`backend/.env`**
```
DB_URL=jdbc:mysql://localhost:3306/Enterprise Learning Platform with Skill & Career Guidance System_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=your_local_password
JWT_SECRET=change-this-to-a-long-random-secret-key-min-32-chars-please
GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key
MAIL_PASSWORD=your_mail_password
```

**`frontend/.env`**
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

> Never commit real `.env` files — only the `.env.example` templates are tracked.

---

## 🔗 API Reference

All endpoints are prefixed with `/api`. Auth-protected routes require a `Bearer <JWT>` header; `/api/admin/**` additionally requires the `ADMIN` role.

| Area | Base Path | Examples |
|---|---|---|
| Auth | `/api/auth` | `POST /register`, `POST /login`, `POST /google`, `POST /forgot-password`, `POST /verify-otp`, `POST /reset-password` |
| Users | `/api/users` | `GET /profile`, `PUT /profile`, `PUT /change-password`, `DELETE /account`, `GET /certificates` |
| Courses | `/api/courses` | `GET /`, `GET /{id}`, `POST /`, `PUT /{id}`, `DELETE /{id}` |
| Modules & Lessons | `/api/courses/{courseId}/modules`, `/api/lessons` | CRUD on modules, lesson listing & completion |
| Enrollments | `/api/enrollments` | `POST /`, `GET /my`, `GET /{courseId}/continue`, `PATCH /{courseId}/progress` |
| Assessments | `/api/assessments` | `GET /`, `POST /{courseId}/start` |
| Module Practice & Quizzes | `/api/practice`, `/api/modules/{id}/quiz` | practice submission, quiz CRUD |
| Coding Practice | `/api/coding` | `GET /questions`, `POST /submit`, `GET /progress`, `GET /leaderboard`, `GET /badges` |
| Contests | `/api/contests` | `GET /`, `POST /{id}/register`, `POST /{id}/submit`, `GET /{id}/leaderboard`, `GET /{id}/certificate` |
| Certificates | `/api/certificates` | `POST /generate/{courseId}`, `GET /my`, `GET /verify/{certificateId}`, `GET /download/{certificateId}` |
| Career Roadmap | `/api/career-roadmaps` | `GET /`, `GET /{roleKey}` |
| Reviews / Bookmarks / Wishlist / Notes | `/api/reviews`, `/api/bookmarks`, `/api/wishlist`, `/api/notes` | course reviews, save-for-later, personal notes |
| AI Chat | `/api/chat` | `POST /` — Gemini-powered chat reply |
| Notifications | `/api/notifications` | `GET /`, `PUT /{id}/read`, `PUT /read-all` |
| Complaints / Support | `/api/complaints` | `POST /`, `GET /my`, `GET /admin/all`, `PATCH /admin/{id}` |
| Admin | `/api/admin` | `GET /stats`, `GET /users`, plus student, revenue & enrollment analytics sub-routes |
| Reports | `/api/reports` | `GET /export/csv/users`, `GET /export/csv/courses` |

---

## 🗄️ Database

MySQL schema and versioned migration scripts live in [`database/`](database), covering core tables plus dedicated migrations for coding practice, contests, course reviews, revenue analytics, student enrollment analytics, and Google auth support.

---

## 👥 Team

**Mentor:** Shakti Gopal Krishnan

**Team Members:** Kartik · Kavipriya · Harshit · Gayatri

---

## 📝 Developer Notes
- **Theme support:** Light/Dark mode toggle in Settings writes a `.light` class to the DOM and persists to `localStorage`.
- **Auto-seeding:** On an empty database, `DataSeeder` populates sample courses and an admin account (`admin@gmail.com` / `superadmin`) — change this before deploying publicly.
- **Jobs board:** currently seeded and managed client-side (mock data in `JobService.js`); wiring it to a persisted backend endpoint is a natural next step.

## 📄 License
This project was built for academic purposes as part of a mentored team project.
