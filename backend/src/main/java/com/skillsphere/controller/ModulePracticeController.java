package com.skillsphere.controller;

import com.skillsphere.dto.PracticeSubmissionRequest;
import com.skillsphere.model.PracticeAttempt;
import com.skillsphere.model.PracticeQuestion;
import com.skillsphere.service.ModulePracticeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/practice")
@CrossOrigin(origins = "*")
public class ModulePracticeController {

    private final ModulePracticeService practiceService;

    public ModulePracticeController(ModulePracticeService practiceService) {
        this.practiceService = practiceService;
    }

    @GetMapping("/module")
    public ResponseEntity<List<PracticeQuestion>> getModuleQuestions(
            @RequestParam(defaultValue = "1") Long courseId,
            @RequestParam(defaultValue = "Module 1") String moduleName) {
        List<PracticeQuestion> questions = practiceService.getQuestionsForModule(courseId, moduleName);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitPractice(
            @RequestBody PracticeSubmissionRequest request,
            Authentication authentication) {
        String email = (authentication != null && authentication.getName() != null)
                ? authentication.getName()
                : "student@skillsphere.edu";
        Map<String, Object> result = practiceService.evaluateAndSavePractice(email, request);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/attempts/{courseId}")
    public ResponseEntity<List<PracticeAttempt>> getAttempts(
            @PathVariable Long courseId,
            Authentication authentication) {
        String email = (authentication != null && authentication.getName() != null)
                ? authentication.getName()
                : "student@skillsphere.edu";
        List<PracticeAttempt> attempts = practiceService.getPreviousAttempts(email, courseId);
        return ResponseEntity.ok(attempts);
    }

    @PostMapping("/reset")
    public ResponseEntity<Map<String, String>> resetAttempts() {
        return ResponseEntity.ok(Map.of("message", "Practice attempt reset successfully"));
    }
}
