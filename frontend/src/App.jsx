import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import StudentDashboardLayout from "./layouts/StudentDashboardLayout";
import AdminLayout from "./layouts/AdminLayout";

// Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import AdminRoute from "./routes/AdminRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CompleteProfile from "./pages/CompleteProfile";

// Student Pages
import DashboardOverview from "./pages/student/dashboard/DashboardOverview";

import CoursesSection from "./pages/student/courses/CoursesSection";
import CourseDetail from "./pages/student/courses/CourseDetail";
import CoursePlayer from "./pages/student/courses/CoursePlayer";

import MyLearningSection from "./pages/student/learning/MyLearningSection";

import ProgressSection from "./pages/student/progress/ProgressSection";

import AssessmentsSection from "./pages/student/assessments/AssessmentsSection";

import CertificatesSection from "./pages/student/certificates/CertificatesSection";

import ProfileSection from "./pages/student/profile/ProfileSection";

import NotificationsSection from "./pages/student/notifications/NotificationsSection";

import SettingsSection from "./pages/student/settings/SettingsSection";

import ResumeBuilder from "./pages/student/resume/ResumeBuilder";
import JobsBoard from "./pages/student/jobs/JobsBoard";
import Contests from "./pages/student/contests/Contests";
import CodingPractice from "./pages/student/coding/CodingPractice";
import SupportSection from "./pages/student/support/SupportSection";
import CareerRoadmapsSection from "./pages/student/roadmaps/CareerRoadmapsSection";
// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ManageCourses from "./pages/admin/ManageCourses";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageCertificates from "./pages/admin/ManageCertificates";
import Reports from "./pages/admin/Reports";
import ManageJobs from "./pages/admin/ManageJobs";
import ManageCourseModules from "./pages/admin/ManageCourseModules";
import StudentEnrollmentsPage from "./pages/admin/enrollments/StudentEnrollmentsPage";
import ManageComplaints from "./pages/admin/complaints/ManageComplaints";

import PublicCertificateVerify from "./pages/PublicCertificateVerify";

export default function App() {
  return (
    <Routes>

      {/* =========================================
                PUBLIC WEBSITE
      ========================================== */}

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/courses"
          element={<CoursesSection />}
        />

        <Route
          path="/courses/:id"
          element={<CourseDetail />}
        />

        <Route
          path="/verify/:certificateId"
          element={<PublicCertificateVerify />}
        />

        <Route
          path="/certificates/verify/:certificateId"
          element={<PublicCertificateVerify />}
        />

      </Route>


      {/* =========================================
                  AUTHENTICATION
      ========================================== */}

      <Route element={<AuthLayout />}>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />

      </Route>
      {/* =========================================
                  STUDENT DASHBOARD
      ========================================== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard Home */}
        <Route
          index
          element={<DashboardOverview />}
        />

        {/* Profile */}
        <Route
          path="profile"
          element={<ProfileSection />}
        />

        <Route
          path="resume"
          element={<ResumeBuilder />}
        />

        <Route
          path="jobs"
          element={<JobsBoard />}
        />

        <Route
          path="contests"
          element={<Contests />}
        />

        <Route
          path="coding-practice"
          element={<CodingPractice />}
        />

        {/* Courses */}
        <Route
          path="courses"
          element={<CoursesSection />}
        />

        <Route
          path="courses/:id"
          element={<CourseDetail />}
        />

        <Route
          path="courses/:id/player"
          element={<CoursePlayer />}
        />

        {/* My Learning */}
        <Route
          path="learning"
          element={<MyLearningSection />}
        />

        {/* Progress */}
        <Route
          path="progress"
          element={<ProgressSection />}
        />

        {/* Assessments */}
        <Route
          path="assessments"
          element={<AssessmentsSection />}
        />

        {/* Certificates */}
        <Route
          path="certificates"
          element={<CertificatesSection />}
        />

        {/* Career Roadmaps */}
        <Route
          path="career-roadmaps"
          element={<CareerRoadmapsSection />}
        />
        <Route
          path="career_roadmaps"
          element={<CareerRoadmapsSection />}
        />
        <Route
          path="career roadmaps"
          element={<CareerRoadmapsSection />}
        />
        <Route
          path="career%20roadmaps"
          element={<CareerRoadmapsSection />}
        />

        {/* Support & Complaints */}
        <Route
          path="support"
          element={<SupportSection />}
        />

        {/* Notifications */}
        <Route
          path="notifications"
          element={<NotificationsSection />}
        />

        {/* Settings */}
        <Route
          path="settings"
          element={<SettingsSection />}
        />
      </Route>
      {/* =========================================
                    ADMIN
      ========================================== */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="courses"
          element={<ManageCourses />}
        />

        <Route
          path="courses/:id/modules"
          element={<ManageCourseModules />}
        />

        <Route
          path="students"
          element={<ManageStudents />}
        />

        <Route
          path="enrollments"
          element={<StudentEnrollmentsPage />}
        />

        <Route
          path="certificates"
          element={<ManageCertificates />}
        />

        <Route
          path="reports"
          element={<Reports />}
        />
        <Route
          path="jobs"
          element={<ManageJobs />}
        />
        <Route
          path="complaints"
          element={<ManageComplaints />}
        />
      </Route>

      {/* =========================================
                    PAGE NOT FOUND
      ========================================== */}

      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-7xl font-bold text-purple-600">
              404
            </h1>

            <h2 className="text-2xl font-semibold mt-4">
              Page Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              The page you're looking for doesn't exist.
            </p>
          </div>
        }
      />

    </Routes>
  );
}