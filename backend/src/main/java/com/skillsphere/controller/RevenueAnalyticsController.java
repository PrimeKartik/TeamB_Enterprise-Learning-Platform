package com.skillsphere.controller;

import com.skillsphere.dto.RevenueAnalyticsResponseDTO;
import com.skillsphere.model.PaymentTransaction;
import com.skillsphere.service.RevenueAnalyticsService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/revenue")
@CrossOrigin(origins = "*")
public class RevenueAnalyticsController {

    private final RevenueAnalyticsService revenueAnalyticsService;

    public RevenueAnalyticsController(RevenueAnalyticsService revenueAnalyticsService) {
        this.revenueAnalyticsService = revenueAnalyticsService;
    }

    @GetMapping
    public ResponseEntity<RevenueAnalyticsResponseDTO> getRevenueSummary(
            @RequestParam(required = false, defaultValue = "30DAYS") String timeframe) {
        return ResponseEntity.ok(revenueAnalyticsService.getAnalyticsData(timeframe));
    }

    @GetMapping("/analytics")
    public ResponseEntity<RevenueAnalyticsResponseDTO> getRevenueAnalytics(
            @RequestParam(required = false, defaultValue = "30DAYS") String timeframe) {
        return ResponseEntity.ok(revenueAnalyticsService.getAnalyticsData(timeframe));
    }

    @GetMapping("/monthly")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyRevenue(
            @RequestParam(required = false, defaultValue = "30DAYS") String timeframe) {
        return ResponseEntity.ok(revenueAnalyticsService.getAnalyticsData(timeframe).getMonthlyRevenueChart());
    }

    @GetMapping("/course")
    public ResponseEntity<List<Map<String, Object>>> getCourseRevenue(
            @RequestParam(required = false, defaultValue = "30DAYS") String timeframe) {
        return ResponseEntity.ok(revenueAnalyticsService.getAnalyticsData(timeframe).getRevenueByCourseChart());
    }

    @GetMapping("/report")
    public ResponseEntity<List<Map<String, Object>>> getRevenueReport(
            @RequestParam(required = false, defaultValue = "30DAYS") String timeframe) {
        return ResponseEntity.ok(revenueAnalyticsService.getAnalyticsData(timeframe).getRevenueReportTable());
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<PaymentTransaction>> getTransactions() {
        return ResponseEntity.ok(revenueAnalyticsService.getAllTransactions());
    }

    @GetMapping("/export/csv")
    public ResponseEntity<byte[]> exportRevenueCSV() {
        String csvContent = "Course ID,Course Name,Course Price,Total Enrollments,Paid Enrollments,Revenue Generated,Refunds,Net Revenue\n" +
                "1,Full Stack Web Development,0.00,1,0,0.00,0.00,0.00\n" +
                "2,Java Programming Masterclass,0.00,0,0,0.00,0.00,0.00\n";

        byte[] bytes = csvContent.getBytes();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=SkillSphere_Revenue_Report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(bytes);
    }
}
