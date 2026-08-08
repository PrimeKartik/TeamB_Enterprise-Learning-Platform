package com.skillsphere.controller;

import com.skillsphere.dto.CertificateDTO;
import com.skillsphere.model.Certificate;
import com.skillsphere.model.Course;
import com.skillsphere.model.User;
import com.skillsphere.repository.CertificateRepository;
import com.skillsphere.repository.CourseRepository;
import com.skillsphere.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/certificates")
public class CertificateController {

    private final CertificateRepository certificateRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public CertificateController(
            CertificateRepository certificateRepository,
            UserRepository userRepository,
            CourseRepository courseRepository) {
        this.certificateRepository = certificateRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public ResponseEntity<List<CertificateDTO>> getAll() {
        return ResponseEntity.ok(
                certificateRepository.findAllByOrderByIssueDateDesc()
                        .stream()
                        .map(CertificateDTO::new)
                        .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        Certificate certificate = certificateRepository.findById(id).orElse(null);
        if (certificate == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Certificate not found"));
        }
        return ResponseEntity.ok(new CertificateDTO(certificate));
    }

    // Issue a new certificate to a student for a course.
    @PostMapping
    public ResponseEntity<?> issue(@RequestBody Map<String, Object> body) {
        Long studentId = Long.valueOf(String.valueOf(body.get("studentId")));
        Long courseId = Long.valueOf(String.valueOf(body.get("courseId")));
        String grade = (String) body.getOrDefault("grade", "A+");

        User student = userRepository.findById(studentId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);

        if (student == null || course == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Student or course not found."));
        }

        long count = certificateRepository.count();
        String certId = String.format("SSLN-2026-%06d", count + 1250);

        Certificate certificate = new Certificate(student, course, certId, grade);
        certificate.setStudentName(student.getName());
        certificate.setCourseName(course.getTitle());
        certificate.setInstructor(course.getInstructor() != null ? course.getInstructor() : "Dr. Alex Morgan");
        certificate.setDuration(course.getDuration() != null ? course.getDuration() : "8 Weeks");
        certificate.setLearningHours("40 Hours");
        certificate.setLevel(course.getLevel() != null ? course.getLevel() : "Intermediate");

        Certificate saved = certificateRepository.save(certificate);

        return ResponseEntity.status(HttpStatus.CREATED).body(new CertificateDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!certificateRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Certificate not found"));
        }
        certificateRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

