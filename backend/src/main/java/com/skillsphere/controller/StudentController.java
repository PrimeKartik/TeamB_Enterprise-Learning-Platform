package com.skillsphere.controller;

import com.skillsphere.model.User;
import com.skillsphere.repository.CertificateRepository;
import com.skillsphere.repository.EnrollmentRepository;
import com.skillsphere.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/students")
public class StudentController {

    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final PasswordEncoder passwordEncoder;
    private final CertificateRepository certificateRepository;

    public StudentController(
            UserRepository userRepository,
            EnrollmentRepository enrollmentRepository,
            PasswordEncoder passwordEncoder,
            CertificateRepository certificateRepository) {

        this.userRepository = userRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.passwordEncoder = passwordEncoder;
        this.certificateRepository = certificateRepository;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllStudents() {
        return ResponseEntity.ok(userRepository.findByRole("STUDENT"));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put("totalStudents", userRepository.countByRole("STUDENT"));
        stats.put("activeStudents", userRepository.countByRoleAndActive("STUDENT", true));

        // Only count completions belonging to real students — an admin
        // account completing a course (e.g. while testing) should never
        // inflate this figure.
        long completedByStudents = enrollmentRepository.findAll().stream()
                .filter(e -> e.getUser() != null && "STUDENT".equals(e.getUser().getRole()))
                .filter(e -> e.getProgress() != null && e.getProgress() >= 100)
                .count();

        stats.put("completedCourses", completedByStudents);
        stats.put("certificates", certificateRepository.countByStudent_Role("STUDENT"));

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStudent(@PathVariable Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Student not found"));
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody Map<String, Object> body) {

        String email = (String) body.get("email");

        if (email == null || userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email is required and must be unique."));
        }

        User user = new User();

        user.setName((String) body.get("name"));
        user.setEmail(email);
        user.setRole("STUDENT");
        user.setProvider("LOCAL");
        user.setPhone((String) body.get("phone"));
        user.setDepartment((String) body.get("department"));
        user.setSemester((String) body.get("semester"));
        user.setActive(body.get("active") == null ? true : (Boolean) body.get("active"));

        String tempPassword = (String) body.getOrDefault("password", "Welcome123!");
        user.setPassword(passwordEncoder.encode(tempPassword));

        User saved = userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Student not found"));
        }

        if (body.get("name") != null)
            user.setName((String) body.get("name"));

        if (body.get("phone") != null)
            user.setPhone((String) body.get("phone"));

        if (body.get("department") != null)
            user.setDepartment((String) body.get("department"));

        if (body.get("semester") != null)
            user.setSemester((String) body.get("semester"));

        if (body.get("active") != null)
            user.setActive((Boolean) body.get("active"));

        User saved = userRepository.save(user);

        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Student not found"));
        }

        // Delete enrollments
        enrollmentRepository.deleteAll(
                enrollmentRepository.findByUser_Email(user.getEmail()));

        // Delete certificates
        certificateRepository.deleteAll(
                certificateRepository.findByStudent_Email(user.getEmail()));

        // Delete student
        userRepository.delete(user);

        return ResponseEntity.ok(
                Map.of("message", "Student deleted successfully"));
    }
}