package com.skillsphere.dto;

import java.util.List;
import java.util.Map;

public class AdminStatsDTO {
    private long totalUsers;
    private long totalStudents;
    private long totalCourses;
    private long activeUsers;
    private long activeEnrollments;
    private long completedCourses;
    private double totalRevenue;
    private long newUsersThisMonth;
    
    private List<Map<String, Object>> monthlyUserRegistrations;
    private List<Map<String, Object>> monthlyCourseEnrollments;

    public AdminStatsDTO() {}

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }

    public long getTotalCourses() { return totalCourses; }
    public void setTotalCourses(long totalCourses) { this.totalCourses = totalCourses; }

    public long getActiveUsers() { return activeUsers; }
    public void setActiveUsers(long activeUsers) { this.activeUsers = activeUsers; }

    public long getActiveEnrollments() { return activeEnrollments; }
    public void setActiveEnrollments(long activeEnrollments) { this.activeEnrollments = activeEnrollments; }

    public long getCompletedCourses() { return completedCourses; }
    public void setCompletedCourses(long completedCourses) { this.completedCourses = completedCourses; }

    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }

    public long getNewUsersThisMonth() { return newUsersThisMonth; }
    public void setNewUsersThisMonth(long newUsersThisMonth) { this.newUsersThisMonth = newUsersThisMonth; }

    public List<Map<String, Object>> getMonthlyUserRegistrations() { return monthlyUserRegistrations; }
    public void setMonthlyUserRegistrations(List<Map<String, Object>> monthlyUserRegistrations) { this.monthlyUserRegistrations = monthlyUserRegistrations; }

    public List<Map<String, Object>> getMonthlyCourseEnrollments() { return monthlyCourseEnrollments; }
    public void setMonthlyCourseEnrollments(List<Map<String, Object>> monthlyCourseEnrollments) { this.monthlyCourseEnrollments = monthlyCourseEnrollments; }
}
