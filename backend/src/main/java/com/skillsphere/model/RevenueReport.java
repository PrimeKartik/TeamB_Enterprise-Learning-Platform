package com.skillsphere.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "revenue_reports")
public class RevenueReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "report_title", nullable = false)
    private String reportTitle;

    @Column(name = "report_type", nullable = false)
    private String reportType; // PDF, EXCEL, MONTHLY, ANNUAL

    @Column(name = "period_name", nullable = false)
    private String periodName;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @Column(name = "total_transactions", nullable = false)
    private Integer totalTransactions;

    @Column(name = "generated_at")
    private LocalDateTime generatedAt = LocalDateTime.now();

    public RevenueReport() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getReportTitle() { return reportTitle; }
    public void setReportTitle(String reportTitle) { this.reportTitle = reportTitle; }

    public String getReportType() { return reportType; }
    public void setReportType(String reportType) { this.reportType = reportType; }

    public String getPeriodName() { return periodName; }
    public void setPeriodName(String periodName) { this.periodName = periodName; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public Integer getTotalTransactions() { return totalTransactions; }
    public void setTotalTransactions(Integer totalTransactions) { this.totalTransactions = totalTransactions; }

    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt; }
}
