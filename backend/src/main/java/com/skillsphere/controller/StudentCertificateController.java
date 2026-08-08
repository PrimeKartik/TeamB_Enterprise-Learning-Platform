package com.skillsphere.controller;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
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

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    /**
     * POST /api/certificates/generate
     */
    @PostMapping("/generate")
    public ResponseEntity<?> generateCertificateFromReq(
            @RequestBody Map<String, Object> body,
            Authentication authentication) {
        Long courseId = null;
        if (body.get("courseId") != null) {
            courseId = Long.valueOf(String.valueOf(body.get("courseId")));
        }
        Long studentId = null;
        if (body.get("studentId") != null) {
            studentId = Long.valueOf(String.valueOf(body.get("studentId")));
        }
        return processGenerate(courseId, studentId, authentication);
    }

    /**
     * POST /api/certificates/generate/{courseId}
     */
    @PostMapping("/generate/{courseId}")
    public ResponseEntity<?> generateCertificatePath(
            @PathVariable Long courseId,
            @RequestParam(required = false) Long studentId,
            Authentication authentication) {
        return processGenerate(courseId, studentId, authentication);
    }

    private ResponseEntity<?> processGenerate(Long courseId, Long studentId, Authentication authentication) {
        if (courseId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Course ID is required."));
        }

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
        if (student == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Authenticated student profile not found."));
        }

        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Course not found."));
        }

        // Ensure enrollment is set to 100% completion
        Optional<Enrollment> enrollmentOpt = enrollmentRepository.findByUser_EmailAndCourse_Id(student.getEmail(), courseId);
        if (enrollmentOpt.isPresent()) {
            Enrollment e = enrollmentOpt.get();
            e.setProgress(100);
            e.setCompleted(true);
            enrollmentRepository.save(e);
        } else {
            Enrollment e = new Enrollment();
            e.setUser(student);
            e.setCourse(course);
            e.setProgress(100);
            e.setCompleted(true);
            enrollmentRepository.save(e);
        }

        // Check if certificate already generated for this user and course
        List<Certificate> existing = certificateRepository.findByStudent_Email(student.getEmail());
        Optional<Certificate> existingCert = existing.stream()
                .filter(c -> c.getCourse() != null && c.getCourse().getId().equals(courseId))
                .findFirst();

        if (existingCert.isPresent()) {
            Certificate cert = existingCert.get();
            return ResponseEntity.ok(Map.of(
                    "message", "Certificate already generated",
                    "certificate", new CertificateDTO(cert),
                    "unlocked", true
            ));
        }

        // Generate unique certificate ID e.g. SSLN-2026-001254
        long count = certificateRepository.count();
        String certId = String.format("SSLN-2026-%06d", count + 1250);

        Certificate newCert = new Certificate(student, course, certId, "A+");
        newCert.setStudentName(student.getName());
        newCert.setCourseName(course.getTitle());
        newCert.setInstructor(course.getInstructor() != null ? course.getInstructor() : "Dr. Alex Morgan");
        newCert.setDuration(course.getDuration() != null ? course.getDuration() : "8 Weeks");
        newCert.setLearningHours("40 Hours");
        newCert.setLevel(course.getLevel() != null ? course.getLevel() : "Intermediate");
        newCert.setCompletionPercentage(100.0);
        newCert.setGrade("A+");
        newCert.setVerificationToken(certId);
        newCert.setQrCode("/verify/" + certId);

        Certificate saved = certificateRepository.save(newCert);

        // Notification
        Notification notification = new Notification(
                student,
                "Certificate Generated! 🎓",
                "Congratulations " + student.getName() + "! Your official certificate for " + course.getTitle() + " (" + certId + ") has been generated.",
                "CERTIFICATE"
        );
        notificationRepository.save(notification);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Congratulations! Your certificate has been generated.",
                "certificate", new CertificateDTO(saved),
                "unlocked", true
        ));
    }

    /**
     * GET /api/certificates/student/{studentId}
     */
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<CertificateDTO>> getStudentCertificates(@PathVariable Long studentId) {
        List<Certificate> certs = certificateRepository.findByStudent_Id(studentId);
        return ResponseEntity.ok(certs.stream().map(CertificateDTO::new).toList());
    }

    /**
     * GET /api/certificates/my-certificates or /api/certificates/my
     */
    @GetMapping({"/my-certificates", "/my"})
    public ResponseEntity<List<CertificateDTO>> getMyCertificates(Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        List<Certificate> certificates = new ArrayList<>();
        User student = null;

        if (email != null) {
            student = userRepository.findByEmail(email).orElse(null);
            if (student != null) {
                certificates = certificateRepository.findByStudent_Email(student.getEmail());
            }
        }

        if (student == null) {
            student = userRepository.findAll().stream()
                    .filter(u -> "STUDENT".equalsIgnoreCase(u.getRole()))
                    .findFirst().orElse(null);
            if (student != null) {
                certificates = certificateRepository.findByStudent_Email(student.getEmail());
            }
        }

        if (certificates.isEmpty()) {
            certificates = certificateRepository.findAll();
        }

        // Auto-generate certificates for 100% completed enrollments if empty for current user
        if (certificates.isEmpty() && student != null) {
            List<Enrollment> enrollments = enrollmentRepository.findByUser_Email(student.getEmail());
            if (enrollments.isEmpty()) {
                enrollments = enrollmentRepository.findAll();
            }
            for (Enrollment e : enrollments) {
                if (e.getCourse() != null && (e.isCompleted() || (e.getProgress() != null && e.getProgress() >= 100))) {
                    long count = certificateRepository.count();
                    String certId = String.format("SSLN-2026-%06d", count + 1250);
                    Certificate newCert = new Certificate(student, e.getCourse(), certId, "A+");
                    newCert.setStudentName(student.getName());
                    certificateRepository.save(newCert);
                }
            }
            certificates = certificateRepository.findByStudent_Email(student.getEmail());
            if (certificates.isEmpty()) {
                certificates = certificateRepository.findAll();
            }
        }

        return ResponseEntity.ok(certificates.stream().map(CertificateDTO::new).toList());
    }


    /**
     * GET /api/certificates/{certificateId}
     */
    @GetMapping("/{certificateId}")
    public ResponseEntity<?> getCertificateById(
            @PathVariable String certificateId,
            Authentication authentication) {

        Optional<Certificate> certOpt = findByAnyId(certificateId);
        if (certOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Certificate not found"));
        }

        Certificate cert = certOpt.get();
        String userEmail = authentication != null ? authentication.getName() : null;

        if (userEmail != null) {
            User currentUser = userRepository.findByEmail(userEmail).orElse(null);
            boolean isOwner = cert.getStudent() != null && cert.getStudent().getEmail().equalsIgnoreCase(userEmail);
            boolean isAdmin = currentUser != null && "ADMIN".equalsIgnoreCase(currentUser.getRole());

            if (!isOwner && !isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Unauthorized access: You can only view your own certificate."));
            }
        }

        return ResponseEntity.ok(new CertificateDTO(cert));
    }

    /**
     * GET /api/certificates/verify/{certificateId} (Public Endpoint)
     */
    @GetMapping("/verify/{certificateId}")
    public ResponseEntity<?> verifyCertificate(@PathVariable String certificateId) {
        Optional<Certificate> certOpt = findByAnyId(certificateId);
        Map<String, Object> res = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy");

        if (certOpt.isPresent()) {
            Certificate cert = certOpt.get();
            res.put("valid", true);
            res.put("status", "VERIFIED");
            res.put("certificateId", cert.getCertificateId());
            res.put("credentialId", cert.getCertificateId());
            res.put("studentName", cert.getStudentName());
            res.put("studentEmail", cert.getStudent() != null ? cert.getStudent().getEmail() : "");
            res.put("courseName", cert.getCourseName());
            res.put("courseTitle", cert.getCourseName());
            res.put("instructor", cert.getInstructor());
            res.put("instructorName", cert.getInstructor());
            res.put("issueDate", cert.getIssueDate() != null ? cert.getIssueDate().format(formatter) : "");
            res.put("completionDate", cert.getCompletionDate() != null ? cert.getCompletionDate().format(formatter) : "");
            res.put("duration", cert.getDuration());
            res.put("learningHours", cert.getLearningHours());
            res.put("level", cert.getLevel());
            res.put("grade", cert.getGrade());
            res.put("completionPercentage", cert.getCompletionPercentage());
            res.put("qrCode", cert.getQrCode());
            res.put("verificationUrl", "/verify/" + cert.getCertificateId());
        } else {
            res.put("valid", false);
            res.put("status", "INVALID");
            res.put("message", "No valid certificate found matching ID: " + certificateId);
        }

        return ResponseEntity.ok(res);
    }

    /**
     * GET /api/certificates/download/{certificateId}
     */
    @GetMapping("/download/{certificateId}")
    public ResponseEntity<?> downloadCertificatePdf(
            @PathVariable String certificateId,
            Authentication authentication) {
        Optional<Certificate> certOpt = findByAnyId(certificateId);
        if (certOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Certificate not found"));
        }

        Certificate cert = certOpt.get();
        String userEmail = authentication != null ? authentication.getName() : null;

        if (userEmail != null) {
            User currentUser = userRepository.findByEmail(userEmail).orElse(null);
            boolean isOwner = cert.getStudent() != null && cert.getStudent().getEmail().equalsIgnoreCase(userEmail);
            boolean isAdmin = currentUser != null && "ADMIN".equalsIgnoreCase(currentUser.getRole());

            if (!isOwner && !isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Unauthorized access: You can only download your own certificate."));
            }
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy");

        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document(PageSize.A4, 36, 36, 36, 36);
            PdfWriter.getInstance(document, out);

            document.open();

            // Colors
            Color purpleColor = new Color(124, 58, 237);
            Color goldColor = new Color(212, 175, 55);
            Color darkColor = new Color(15, 23, 42);

            // Fonts
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22, purpleColor);
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, darkColor);
            Font subtitleFont = FontFactory.getFont(FontFactory.HELVETICA, 10, Color.GRAY);
            Font nameFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, purpleColor);
            Font courseFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, goldColor);
            Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 9, darkColor);
            Font labelFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 8, Color.DARK_GRAY);

            // Title Header
            Paragraph brand = new Paragraph("SKILLSPHERE LEARNING NEXUS", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, goldColor));
            brand.setAlignment(Element.ALIGN_CENTER);
            document.add(brand);

            Paragraph certTitle = new Paragraph("CERTIFICATE OF COMPLETION", headerFont);
            certTitle.setAlignment(Element.ALIGN_CENTER);
            certTitle.setSpacingAfter(10);
            document.add(certTitle);

            Paragraph pres = new Paragraph("THIS CERTIFICATE IS PROUDLY PRESENTED TO", subtitleFont);
            pres.setAlignment(Element.ALIGN_CENTER);
            document.add(pres);

            Paragraph name = new Paragraph(cert.getStudentName(), nameFont);
            name.setAlignment(Element.ALIGN_CENTER);
            name.setSpacingAfter(10);
            document.add(name);

            Paragraph comp = new Paragraph("FOR SUCCESSFULLY COMPLETING THE COURSE", subtitleFont);
            comp.setAlignment(Element.ALIGN_CENTER);
            document.add(comp);

            Paragraph courseName = new Paragraph("\"" + cert.getCourseName() + "\"", courseFont);
            courseName.setAlignment(Element.ALIGN_CENTER);
            courseName.setSpacingAfter(20);
            document.add(courseName);

            // Details Table
            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10);
            table.setSpacingAfter(20);

            addCell(table, "CERTIFICATE ID", cert.getCertificateId(), labelFont, bodyFont);
            addCell(table, "COMPLETION DATE", cert.getCompletionDate() != null ? cert.getCompletionDate().format(formatter) : "", labelFont, bodyFont);
            addCell(table, "INSTRUCTOR", cert.getInstructor(), labelFont, bodyFont);

            addCell(table, "DURATION", cert.getDuration(), labelFont, bodyFont);
            addCell(table, "SKILL LEVEL", cert.getLevel(), labelFont, bodyFont);
            addCell(table, "LEARNING HOURS", cert.getLearningHours(), labelFont, bodyFont);

            addCell(table, "GRADE", cert.getGrade(), labelFont, bodyFont);
            addCell(table, "PROGRESS", "100%", labelFont, bodyFont);
            addCell(table, "STATUS", cert.getStatus(), labelFont, bodyFont);

            document.add(table);

            // Signatures & Footer
            Paragraph footer = new Paragraph("Verified via SkillSphere Learning Nexus | ID: " + cert.getCertificateId(), subtitleFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();

            byte[] pdfBytes = out.toByteArray();

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + cert.getCertificateId() + ".pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error generating PDF: " + e.getMessage()));
        }
    }

    private void addCell(PdfPTable table, String label, String val, Font labelFont, Font bodyFont) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(new Color(248, 250, 252));
        cell.setPadding(8);
        cell.addElement(new Paragraph(label, labelFont));
        cell.addElement(new Paragraph(val != null ? val : "", bodyFont));
        table.addCell(cell);
    }

    private Optional<Certificate> findByAnyId(String idStr) {
        if (idStr == null || idStr.isBlank()) return Optional.empty();

        Optional<Certificate> byCertId = certificateRepository.findByCertificateIdIgnoreCase(idStr);
        if (byCertId.isPresent()) return byCertId;

        Optional<Certificate> byToken = certificateRepository.findByVerificationToken(idStr);
        if (byToken.isPresent()) return byToken;

        try {
            Long numericId = Long.parseLong(idStr);
            return certificateRepository.findById(numericId);
        } catch (NumberFormatException ignored) {}

        return certificateRepository.findAll().stream()
                .filter(c -> idStr.equalsIgnoreCase(c.getCertificateId()) || idStr.equalsIgnoreCase(c.getCredentialId()))
                .findFirst();
    }
}
