import { useEffect, useMemo, useState } from 'react'
import {
  BookOpen,
  CheckCircle2,
  Trophy,
  TrendingUp,
} from 'lucide-react'

import { enrollmentApi } from '../../../api/enrollmentApi'
import { dashboardApi } from '../../../api/dashboardApi'

import DashboardHero from './components/DashboardHero'
import SummaryCard from './components/SummaryCard'
import ContinueLearning from './components/ContinueLearning'
import CourseGrid from './components/CourseGrid'
import LearningAnalytics from './components/LearningAnalytics'
import RecentActivity from './components/RecentActivity'
import DailyGoal from './components/DailyGoal'
import DashboardSkeleton from './components/DashboardSkeleton'
import DashboardError from './components/DashboardError'
import EmptyDashboard from './components/EmptyDashboard'
import LearningStreakCard from './components/LearningStreakCard'

export default function DashboardOverview() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data } = await dashboardApi.get()

      setDashboard(data)
    } catch (err) {
      console.error(err)

      setError(
        err.response?.data?.message ||
          'Unable to load dashboard.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const handleProgressUpdate = async (
    courseId,
    currentProgress
  ) => {
    try {
      const nextProgress = Math.min(
        currentProgress + 10,
        100
      )

      await enrollmentApi.updateProgress(
        courseId,
        nextProgress
      )

      loadDashboard()
    } catch (err) {
      console.error(err)
    }
  }

  const summaryCards = useMemo(() => {
    if (!dashboard) return []

    return [
      {
        title: 'Enrolled Courses',
        value: dashboard.totalCourses,
        subtitle: 'Courses joined',
        icon: BookOpen,
      },

      {
        title: 'Completed',
        value: dashboard.completedCourses,
        subtitle: 'Courses completed',
        icon: CheckCircle2,
      },

      {
        title: 'Average Progress',
        value: `${Math.round(
          dashboard.averageProgress
        )}%`,
        subtitle: 'Across all courses',
        icon: TrendingUp,
      },

      {
        title: 'Achievements',
        value: dashboard.completedCourses,
        subtitle: 'Certificates earned',
        icon: Trophy,
      },
    ]
  }, [dashboard])

  const recentActivities = useMemo(() => {
    if (!dashboard) return []

    return dashboard.enrollments
      .slice(0, 5)
      .map((enrollment) => ({
        id: enrollment.id,

        title: enrollment.course.title,

        description: `Current Progress ${enrollment.progress}%`,

        type:
          enrollment.progress >= 100
            ? 'CERTIFICATE'
            : 'COURSE',

        time: new Date(
          enrollment.enrolledAt
        ).toLocaleDateString(),
      }))
  }, [dashboard])

  if (loading) {
    return <DashboardSkeleton />
  }

  if (error) {
    return (
      <DashboardError
        message={error}
        onRetry={loadDashboard}
      />
    )
  }

  if (
    !dashboard ||
    dashboard.enrollments.length === 0
  ) {
    return <EmptyDashboard />
  }
    return (
    <div className="space-y-8">

      {/* Hero Section */}

      <DashboardHero
        name={dashboard.name}
        email={dashboard.email}
        totalCourses={dashboard.totalCourses}
        completedCourses={dashboard.completedCourses}
      />

      {/* Summary Cards */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {summaryCards.map((card) => (
          <SummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={card.icon}
          />
        ))}
      </section>

      {/* Continue Learning */}

      <ContinueLearning
        enrollments={dashboard.enrollments.map((item) => ({
          enrollmentId: item.id,
          courseId: item.course.id,
          courseTitle: item.course.title,
          level: item.course.level,
          duration: item.course.duration,
          progress: item.progress,
          imageUrl: item.course.imageUrl,
        }))}
      />

      {/* My Courses */}

      <section>

        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-heading text-2xl font-bold">
              My Courses
            </h2>

            <p className="text-muted">
              Continue learning from your enrolled courses.
            </p>
          </div>

        </div>

        <CourseGrid
          enrollments={dashboard.enrollments.map((item) => ({
            enrollmentId: item.id,
            courseId: item.course.id,
            courseTitle: item.course.title,
            level: item.course.level,
            duration: item.course.duration,
            progress: item.progress,
            imageUrl: item.course.imageUrl,
          }))}
          onBump={handleProgressUpdate}
        />

      </section>

      {/* Analytics */}

      <LearningAnalytics
        totalCourses={dashboard.totalCourses}
        completedCourses={dashboard.completedCourses}
        averageProgress={dashboard.averageProgress}
      />

      {/* Learning Streak & Activity Heatmap */}
      <LearningStreakCard streakDays={12} />

      {/* Bottom Section */}
      <section className="grid xl:grid-cols-2 gap-6">
        <RecentActivity
          activities={recentActivities}
        />

        <DailyGoal
          completedLessons={dashboard.completedCourses}
          targetLessons={dashboard.totalCourses}
        />
      </section>

    </div>
  )
}