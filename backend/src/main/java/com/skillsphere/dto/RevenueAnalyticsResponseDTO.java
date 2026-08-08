package com.skillsphere.dto;

import java.util.List;
import java.util.Map;

public class RevenueAnalyticsResponseDTO {
    // KPI Cards
    private double totalRevenue = 0.0;
    private double monthlyRevenue = 0.0;
    private double todaysRevenue = 0.0;
    private double thisWeekRevenue = 0.0;
    private double thisYearRevenue = 0.0;
    private int totalPaidEnrollments = 0;
    private int freeCourseEnrollments = 0;
    private double avgRevenuePerStudent = 0.0;
    private double revenueGrowthPct = 0.0;
    private double pendingPayments = 0.0;
    private double refundedAmount = 0.0;

    // Charts Data
    private List<Map<String, Object>> monthlyRevenueChart;
    private List<Map<String, Object>> revenueByCourseChart;
    private List<Map<String, Object>> revenueDistributionChart;
    private List<Map<String, Object>> weeklyRevenueChart;
    private List<Map<String, Object>> enrollmentVsRevenueChart;

    // Top Courses Table & Revenue Report Table
    private List<Map<String, Object>> topRevenueCourses;
    private List<Map<String, Object>> revenueReportTable;

    // Insights
    private Map<String, String> insights;

    public RevenueAnalyticsResponseDTO() {}

    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }

    public double getMonthlyRevenue() { return monthlyRevenue; }
    public void setMonthlyRevenue(double monthlyRevenue) { this.monthlyRevenue = monthlyRevenue; }

    public double getTodaysRevenue() { return todaysRevenue; }
    public void setTodaysRevenue(double todaysRevenue) { this.todaysRevenue = todaysRevenue; }

    public double getThisWeekRevenue() { return thisWeekRevenue; }
    public void setThisWeekRevenue(double thisWeekRevenue) { this.thisWeekRevenue = thisWeekRevenue; }

    public double getThisYearRevenue() { return thisYearRevenue; }
    public void setThisYearRevenue(double thisYearRevenue) { this.thisYearRevenue = thisYearRevenue; }

    public int getTotalPaidEnrollments() { return totalPaidEnrollments; }
    public void setTotalPaidEnrollments(int totalPaidEnrollments) { this.totalPaidEnrollments = totalPaidEnrollments; }

    public int getFreeCourseEnrollments() { return freeCourseEnrollments; }
    public void setFreeCourseEnrollments(int freeCourseEnrollments) { this.freeCourseEnrollments = freeCourseEnrollments; }

    public double getAvgRevenuePerStudent() { return avgRevenuePerStudent; }
    public void setAvgRevenuePerStudent(double avgRevenuePerStudent) { this.avgRevenuePerStudent = avgRevenuePerStudent; }

    public double getRevenueGrowthPct() { return revenueGrowthPct; }
    public void setRevenueGrowthPct(double revenueGrowthPct) { this.revenueGrowthPct = revenueGrowthPct; }

    public double getPendingPayments() { return pendingPayments; }
    public void setPendingPayments(double pendingPayments) { this.pendingPayments = pendingPayments; }

    public double getRefundedAmount() { return refundedAmount; }
    public void setRefundedAmount(double refundedAmount) { this.refundedAmount = refundedAmount; }

    public List<Map<String, Object>> getMonthlyRevenueChart() { return monthlyRevenueChart; }
    public void setMonthlyRevenueChart(List<Map<String, Object>> monthlyRevenueChart) { this.monthlyRevenueChart = monthlyRevenueChart; }

    public List<Map<String, Object>> getRevenueByCourseChart() { return revenueByCourseChart; }
    public void setRevenueByCourseChart(List<Map<String, Object>> revenueByCourseChart) { this.revenueByCourseChart = revenueByCourseChart; }

    public List<Map<String, Object>> getRevenueDistributionChart() { return revenueDistributionChart; }
    public void setRevenueDistributionChart(List<Map<String, Object>> revenueDistributionChart) { this.revenueDistributionChart = revenueDistributionChart; }

    public List<Map<String, Object>> getWeeklyRevenueChart() { return weeklyRevenueChart; }
    public void setWeeklyRevenueChart(List<Map<String, Object>> weeklyRevenueChart) { this.weeklyRevenueChart = weeklyRevenueChart; }

    public List<Map<String, Object>> getEnrollmentVsRevenueChart() { return enrollmentVsRevenueChart; }
    public void setEnrollmentVsRevenueChart(List<Map<String, Object>> enrollmentVsRevenueChart) { this.enrollmentVsRevenueChart = enrollmentVsRevenueChart; }

    public List<Map<String, Object>> getTopRevenueCourses() { return topRevenueCourses; }
    public void setTopRevenueCourses(List<Map<String, Object>> topRevenueCourses) { this.topRevenueCourses = topRevenueCourses; }

    public List<Map<String, Object>> getRevenueReportTable() { return revenueReportTable; }
    public void setRevenueReportTable(List<Map<String, Object>> revenueReportTable) { this.revenueReportTable = revenueReportTable; }

    public Map<String, String> getInsights() { return insights; }
    public void setInsights(Map<String, String> insights) { this.insights = insights; }
}
