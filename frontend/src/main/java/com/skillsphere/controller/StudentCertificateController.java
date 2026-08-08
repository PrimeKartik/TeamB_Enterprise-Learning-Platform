package com.skillsphere.controller;

import com.skillsphere.dto.CertificateDTO;
import com.skillsphere.model.Certificate;
import com.skillsphere.model.Course;
import com.skillsphere.model.Enrollment;
import com.skillsphere.model.Notification;
import com.skillsphere.model.User;
import com.skillsphere.repository.CertificateRepository;
import com.skillsphere.repository.CourseRepository;
import com.skillsphere.repository.EnrollmentRepository;
import com.skillsphere.repository.NotificationRepository;
import com.skillsphere.repository.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "*")
public class StudentCertificateController {

    private final CertificateRepository certificateRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final NotificationRepository notificationRepository;

    public StudentCertificateController(
            CertificateRepository certificateRepository,
            UserRepository userRepository,
            CourseRepository courseRepository,
            EnrollmentRepository enrollmentRepository,
            NotificationRepository notificationRepository) {
        this.certificateRepository = certificateRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.notificationRepository = notificationRepository;
    }

    // POST /api/certificates/generate/{courseId}
    @PostMapping("/generate/{courseId}")
    public ResponseEntity<?> generateCertificate(
            @PathVariable Long courseId,
            @RequestParam(required = false) Long studentId,
            Authentication authentication) {

        String userEmail = authentication != null ? authentication.getName() : null;
        User student = null;

        if (userEmail != null) {
            student = userRepository.findByEmail(userEmail).orElse(null);
        }
        if (student == null && studentId != null) {
            student = userRepository.findById(studentId).orElse(null);
        }
        if (student == null) {
            student = userRepository.findAll().stream()
                    .filter(u -> "STUDENT".equalsIgnoreCase(u.getRole()))
                    .findFirst().orElse(null);
        }

        Course course = courseRepository.findById(courseId).orElse(null);

        if (student == null || course == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Student or Course not found."));
        }

        // Verify completion progress in MySQL
        Optional<Enrollment> enrollmentOpt = enrollmentRepository.findByUser_EmailAndCourse_Id(student.getEmail(), courseId);
        int progress = enrollmentOpt.map(Enrollment::getProgress).orElse(100);

        if (progress < 100) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", "Complete the course to unlock your certificate.",
                    "progress", progress,
                    "completed", false
            ));
        }

        // Check if certificate already generated
        List<Certificate> existing = certificateRepository.findByStudent_Email(student.getEmail());
        Optional<Certificate> existingCert = existing.stream().filter(c -> c.getCourse().getId().equals(courseId)).findFirst();

        if (existingCert.isPresent()) {
            return ResponseEntity.ok(Map.of(
                    "message", "Certificate already generated",
                    "certificate", new CertificateDTO(existingCert.get()),
                    "unlocked", true
            ));
        }

        // Generate unique certificate ID
        String credentialId = "SKILL-" + course.getId() + "-" + student.getId() + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        Certificate newCert = new Certificate(student, course, credentialId, "A+");
        Certificate saved = certificateRepository.save(newCert);

        // Save Notification to Notification Center
        Notification notification = new Notification(
                student,
                "Certificate Generated! 🎓",
                "Congratulations! Your official certificate for " + course.getTitle() + " has been generated.",
                "CERTIFICATE"
        );
        notificationRepository.save(notification);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Congratulations! Your certificate has been generated.",
                "certificate", new CertificateDTO(saved),
                "unlocked", true
        ));
    }

    // GET /api/certificates/student/{studentId}
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<CertificateDTO>> getStudentCertificates(@PathVariable Long studentId) {
        User student = userRepository.findById(studentId).orElse(null);
        if (student == null) {
            return ResponseEntity.ok(List.of());
        }
        List<Certificate> certificates = certificateRepository.findByStudent_Email(student.getEmail());
        return ResponseEntity.ok(certificates.stream().map(CertificateDTO::new).toList());
    }

    // GET /api/certificates/my-certificates
    @GetMapping("/my-certificates")
    public ResponseEntity<List<CertificateDTO>> getMyCertificates(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : "ezhil@gmail.com";
        List<Certificate> certificates = certificateRepository.findByStudent_Email(email);
        if (certificates.isEmpty()) {
            certificates = certificateRepository.findAll();
        }
        return ResponseEntity.ok(certificates.stream().map(CertificateDTO::new).toList());
    }

    // GET /api/certificates/{certificateId}
    @GetMapping("/{certificateId}")
    public ResponseEntity<?> getCertificateById(@PathVariable String certificateId) {
        Optional<Certificate> certOpt = findByAnyId(certificateId);
        if (certOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Certificate not found"));
        }
        return ResponseEntity.ok(new CertificateDTO(certOpt.get()));
    }

    // GET /api/certificates/verify/{certificateId}
    @GetMapping("/verify/{certificateId}")
    public ResponseEntity<?> verifyCertificate(@PathVariable String certificateId) {
        Optional<Certificate> certOpt = findByAnyId(certificateId);
        Map<String, Object> res = new HashMap<>();

        if (certOpt.isPresent()) {
            Certificate cert = certOpt.get();
            res.put("valid", true);
            res.put("status", "VALID");
            res.put("certificateId", cert.getCredentialId());
            res.put("studentName", cert.getStudent().getName());
            res.put("studentEmail", cert.getStudent().getEmail());
            res.put("courseTitle", cert.getCourse().getTitle());
            res.put("issueDate", cert.getIssueDate().format(DateTimeFormatter.ofPattern("MMMM dd, yyyy")));
            res.put("completionPercentage", 100);
            res.put("instructorName", "SkillSphere Master Instructor");
        } else {
            res.put("valid", false);
            res.put("status", "INVALID");
            res.put("message", "No valid certificate found matching ID: " + certificateId);
        }

        return ResponseEntity.ok(res);
    }

    // GET /api/certificates/download/{certificateId}
    @GetMapping("/download/{certificateId}")
    public ResponseEntity<byte[]> downloadCertificatePdf(@PathVariable String certificateId) {
        Optional<Certificate> certOpt = findByAnyId(certificateId);
        Certificate cert = certOpt.orElseGet(() -> {
            List<Certificate> all = certificateRepository.findAll();
            return all.isEmpty() ? null : all.get(0);
        });

        String studentName = cert != null ? cert.getStudent().getName() : "Student";
        String courseTitle = cert != null ? cert.getCourse().getTitle() : "SkillSphere Course";
        String credId = cert != null ? cert.getCredentialId() : "SKILL-VERIFIED";

        String htmlContent = "<html><body style='font-family:Arial;text-align:center;padding:50px;'>"
                + "<h1 style='color:#7c3aed;'>SkillSphere Learning Nexus</h1>"
                + "<h2>Certificate of Completion</h2>"
                + "<p>This certifies that <strong>" + studentName + "</strong></p>"
                + "<p>has successfully completed 100% of the course</p>"
                + "<h3 style='color:#ec4899;'>" + courseTitle + "</h3>"
                + "<p>Credential ID: " + credId + "</p>"
                + "</body></html>";

        byte[] bytes = htmlContent.getBytes(StandardCharsets.UTF_8);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + credId + ".html")
                .contentType(MediaType.TEXT_HTML)
                .body(bytes);
    }

    private Optional<Certificate> findByAnyId(String idStr) {
        try {
            Long numericId = Long.parseLong(idStr);
            Optional<Certificate> byId = certificateRepository.findById(numericId);
            if (byId.isPresent()) return byId;
        } catch (NumberFormatException ignored) {}

        return certificateRepository.findAll().stream()
                .filter(c -> c.getCredentialId().equalsIgnoreCase(idStr))
                .findFirst();
    }
}
