package com.skillsphere.dto;

import java.util.List;

public class DashboardResponse {

    private String name;
    private String email;

    private int totalCourses;
    private int completedCourses;
    private double averageProgress;

    private List<EnrollmentSummary> enrollments;

    public DashboardResponse() {
    }

    public DashboardResponse(
            String name,
            String email,
            int totalCourses,
            int completedCourses,
            double averageProgress,
            List<EnrollmentSummary> enrollments
    ) {
        this.name = name;
        this.email = email;
        this.totalCourses = totalCourses;
        this.completedCourses = completedCourses;
        this.averageProgress = averageProgress;
        this.enrollments = enrollments;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getTotalCourses() {
        return totalCourses;
    }

    public void setTotalCourses(int totalCourses) {
        this.totalCourses = totalCourses;
    }

    public int getCompletedCourses() {
        return completedCourses;
    }

    public void setCompletedCourses(int completedCourses) {
        this.completedCourses = completedCourses;
    }

    public double getAverageProgress() {
        return averageProgress;
    }

    public void setAverageProgress(double averageProgress) {
        this.averageProgress = averageProgress;
    }

    public List<EnrollmentSummary> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(List<EnrollmentSummary> enrollments) {
        this.enrollments = enrollments;
    }
}