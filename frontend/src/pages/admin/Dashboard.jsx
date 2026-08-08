import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { adminApi } from "../../api/adminApi";
import DashboardCard from "./components/DashboardCard";
import RevenueAnalytics from "./components/revenue/RevenueAnalytics";

export default function Dashboard() {

    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            setError(null);
            const response = await adminApi.dashboard();
            setStats(response.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load dashboard stats right now.");
        }
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
                <AlertCircle className="mx-auto mb-3 text-red-400" size={28} />
                <p className="text-red-400">{error}</p>
                <button
                    onClick={loadDashboard}
                    className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!stats)
        return (
            <div className="grid lg:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-28 rounded-2xl bg-soft animate-pulse" />
                ))}
            </div>
        );

    return (

        <div className="space-y-8">

            <div className="grid lg:grid-cols-5 gap-6">

                <DashboardCard
                    title="Students"
                    value={stats.totalStudents}
                    icon="students"
                    color="bg-purple-600"
                />

                <DashboardCard
                    title="Courses"
                    value={stats.totalCourses}
                    icon="courses"
                    color="bg-green-500"
                />

                <DashboardCard
                    title="Enrollments"
                    value={stats.activeEnrollments}
                    icon="enrollments"
                    color="bg-purple-500"
                />

                <DashboardCard
                    title="Completed Courses"
                    value={stats.completedCourses}
                    icon="certificates"
                    color="bg-yellow-500"
                />

                <DashboardCard
                    title="Active Users"
                    value={stats.activeUsers}
                    icon="students"
                    color="bg-red-500"
                />

            </div>

            {/* Revenue Generation Analytics Section */}
            <RevenueAnalytics />

        </div>

    );

}
