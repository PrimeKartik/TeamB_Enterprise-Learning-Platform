package com.skillsphere.dto;

import com.skillsphere.model.StudentEnrollmentDetail;
import java.util.List;
import java.util.Map;

public class StudentLearningAnalyticsDTO {
    // 8 Key Analytics Widgets
    private int totalStudentsEnrolled = 0;
    private int studentsLearningToday = 0;
    private int completedCourses = 0;
    private int certificatesGenerated = 0;
    private double avgCompletionRate = 0.0;
    private double avgQuizScore = 0.0;
    private double avgCodingScore = 0.0;
    private int inactiveStudentsCount = 0;

    // Lists
    private List<StudentEnrollmentDetail> topPerformingStudents;
    private List<StudentEnrollmentDetail> recentlyEnrolledStudents;
    private List<StudentEnrollmentDetail> inactiveStudents;

    // 8 Interactive Charts Data
    private List<Map<String, Object>> courseEnrollmentChart;
    private List<Map<String, Object>> studentProgressDistribution;
    private List<Map<String, Object>> dailyActiveStudentsChart;
    private List<Map<String, Object>> courseCompletionTrendChart;
    private List<Map<String, Object>> quizPerformanceChart;
    private List<Map<String, Object>> codingPracticeRadar;
    private List<Map<String, Object>> certificatesIssuedChart;
    private List<Map<String, Object>> monthlyEnrollmentsChart;

    public StudentLearningAnalyticsDTO() {}

    public int getTotalStudentsEnrolled() { return totalStudentsEnrolled; }
    public void setTotalStudentsEnrolled(int totalStudentsEnrolled) { this.totalStudentsEnrolled = totalStudentsEnrolled; }

    public int getStudentsLearningToday() { return studentsLearningToday; }
    public void setStudentsLearningToday(int studentsLearningToday) { this.studentsLearningToday = studentsLearningToday; }

    public int getCompletedCourses() { return completedCourses; }
    public void setCompletedCourses(int completedCourses) { this.completedCourses = completedCourses; }

    public int getCertificatesGenerated() { return certificatesGenerated; }
    public void setCertificatesGenerated(int certificatesGenerated) { this.certificatesGenerated = certificatesGenerated; }

    public double getAvgCompletionRate() { return avgCompletionRate; }
    public void setAvgCompletionRate(double avgCompletionRate) { this.avgCompletionRate = avgCompletionRate; }

    public double getAvgQuizScore() { return avgQuizScore; }
    public void setAvgQuizScore(double avgQuizScore) { this.avgQuizScore = avgQuizScore; }

    public double getAvgCodingScore() { return avgCodingScore; }
    public void setAvgCodingScore(double avgCodingScore) { this.avgCodingScore = avgCodingScore; }

    public int getInactiveStudentsCount() { return inactiveStudentsCount; }
    public void setInactiveStudentsCount(int inactiveStudentsCount) { this.inactiveStudentsCount = inactiveStudentsCount; }

    public List<StudentEnrollmentDetail> getTopPerformingStudents() { return topPerformingStudents; }
    public void setTopPerformingStudents(List<StudentEnrollmentDetail> topPerformingStudents) { this.topPerformingStudents = topPerformingStudents; }

    public List<StudentEnrollmentDetail> getRecentlyEnrolledStudents() { return recentlyEnrolledStudents; }
    public void setRecentlyEnrolledStudents(List<StudentEnrollmentDetail> recentlyEnrolledStudents) { this.recentlyEnrolledStudents = recentlyEnrolledStudents; }

    public List<StudentEnrollmentDetail> getInactiveStudents() { return inactiveStudents; }
    public void setInactiveStudents(List<StudentEnrollmentDetail> inactiveStudents) { this.inactiveStudents = inactiveStudents; }

    public List<Map<String, Object>> getCourseEnrollmentChart() { return courseEnrollmentChart; }
    public void setCourseEnrollmentChart(List<Map<String, Object>> courseEnrollmentChart) { this.courseEnrollmentChart = courseEnrollmentChart; }

    public List<Map<String, Object>> getStudentProgressDistribution() { return studentProgressDistribution; }
    public void setStudentProgressDistribution(List<Map<String, Object>> studentProgressDistribution) { this.studentProgressDistribution = studentProgressDistribution; }

    public List<Map<String, Object>> getDailyActiveStudentsChart() { return dailyActiveStudentsChart; }
    public void setDailyActiveStudentsChart(List<Map<String, Object>> dailyActiveStudentsChart) { this.dailyActiveStudentsChart = dailyActiveStudentsChart; }

    public List<Map<String, Object>> getCourseCompletionTrendChart() { return courseCompletionTrendChart; }
    public void setCourseCompletionTrendChart(List<Map<String, Object>> courseCompletionTrendChart) { this.courseCompletionTrendChart = courseCompletionTrendChart; }

    public List<Map<String, Object>> getQuizPerformanceChart() { return quizPerformanceChart; }
    public void setQuizPerformanceChart(List<Map<String, Object>> quizPerformanceChart) { this.quizPerformanceChart = quizPerformanceChart; }

    public List<Map<String, Object>> getCodingPracticeRadar() { return codingPracticeRadar; }
    public void setCodingPracticeRadar(List<Map<String, Object>> codingPracticeRadar) { this.codingPracticeRadar = codingPracticeRadar; }

    public List<Map<String, Object>> getCertificatesIssuedChart() { return certificatesIssuedChart; }
    public void setCertificatesIssuedChart(List<Map<String, Object>> certificatesIssuedChart) { this.certificatesIssuedChart = certificatesIssuedChart; }

    public List<Map<String, Object>> getMonthlyEnrollmentsChart() { return monthlyEnrollmentsChart; }
    public void setMonthlyEnrollmentsChart(List<Map<String, Object>> monthlyEnrollmentsChart) { this.monthlyEnrollmentsChart = monthlyEnrollmentsChart; }
}
