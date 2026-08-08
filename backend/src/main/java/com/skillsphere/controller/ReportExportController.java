package com.skillsphere.controller;

import com.skillsphere.model.Course;
import com.skillsphere.model.User;
import com.skillsphere.repository.CourseRepository;
import com.skillsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportExportController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/export/csv/users")
    public ResponseEntity<byte[]> exportUsersCsv() {
        List<User> users = userRepository.findAll();
        StringBuilder csv = new StringBuilder("ID,Name,Email,Role,CreatedAt\n");
        for (User u : users) {
            csv.append(u.getId()).append(",")
               .append("\"").append(u.getName()).append("\",")
               .append(u.getEmail()).append(",")
               .append(u.getRole()).append(",")
               .append(u.getCreatedAt()).append("\n");
        }
        byte[] bytes = csv.toString().getBytes(StandardCharsets.UTF_8);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=students_report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(bytes);
    }

    @GetMapping("/export/csv/courses")
    public ResponseEntity<byte[]> exportCoursesCsv() {
        List<Course> courses = courseRepository.findAll();
        StringBuilder csv = new StringBuilder("ID,Title,Level,Duration,Price,Rating\n");
        for (Course c : courses) {
            csv.append(c.getId()).append(",")
               .append("\"").append(c.getTitle()).append("\",")
               .append(c.getLevel()).append(",")
               .append(c.getDuration()).append(",")
               .append(c.getPrice()).append(",")
               .append(c.getRating()).append("\n");
        }
        byte[] bytes = csv.toString().getBytes(StandardCharsets.UTF_8);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=courses_report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(bytes);
    }
}
