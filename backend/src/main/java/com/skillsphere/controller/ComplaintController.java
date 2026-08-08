package com.skillsphere.controller;

import com.skillsphere.model.Complaint;
import com.skillsphere.repository.ComplaintRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintRepository complaintRepository;

    public ComplaintController(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    @PostMapping
    public ResponseEntity<Complaint> createComplaint(@RequestBody Complaint complaint, Authentication authentication) {
        String email = authentication != null ? authentication.getName() : "student@gmail.com";
        complaint.setStudentEmail(email);
        if (complaint.getStudentName() == null || complaint.getStudentName().isEmpty()) {
            complaint.setStudentName(email.split("@")[0]);
        }
        Complaint saved = complaintRepository.save(complaint);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Complaint>> getMyComplaints(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : "student@gmail.com";
        List<Complaint> list = complaintRepository.findByStudentEmailOrderByCreatedAtDesc(email);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Complaint>> getAllComplaintsAdmin() {
        List<Complaint> list = complaintRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(list);
    }

    @PatchMapping("/admin/{id}")
    public ResponseEntity<Complaint> updateComplaintStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        if (body.containsKey("status")) complaint.setStatus(body.get("status"));
        if (body.containsKey("priority")) complaint.setPriority(body.get("priority"));
        if (body.containsKey("adminReply")) complaint.setAdminReply(body.get("adminReply"));
        complaint.setUpdatedAt(LocalDateTime.now());

        Complaint updated = complaintRepository.save(complaint);
        return ResponseEntity.ok(updated);
    }
}
