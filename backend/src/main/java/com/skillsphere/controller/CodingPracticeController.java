package com.skillsphere.controller;

import com.skillsphere.dto.CodingSubmissionRequest;
import com.skillsphere.dto.CodingSubmissionResultDTO;
import com.skillsphere.model.*;
import com.skillsphere.service.CodingPracticeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coding")
@CrossOrigin(origins = "*")
public class CodingPracticeController {

    private final CodingPracticeService codingPracticeService;

    public CodingPracticeController(CodingPracticeService codingPracticeService) {
        this.codingPracticeService = codingPracticeService;
    }

    @GetMapping("/questions")
    public ResponseEntity<List<CodingQuestion>> getAllQuestions(
            @RequestParam(required = false) Long courseId,
            @RequestParam(required = false) String difficulty) {
        if (courseId != null) {
            return ResponseEntity.ok(codingPracticeService.getQuestionsByCourseId(courseId));
        }
        return ResponseEntity.ok(codingPracticeService.getAllQuestions());
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<CodingQuestion> getQuestionById(@PathVariable Long id) {
        return codingPracticeService.getQuestionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<CodingQuestion>> getQuestionsByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(codingPracticeService.getQuestionsByCourseId(courseId));
    }

    @PostMapping("/submit")
    public ResponseEntity<CodingSubmissionResultDTO> submitSolution(
            Authentication authentication,
            @RequestBody CodingSubmissionRequest request) {
        String email = (authentication != null && authentication.getName() != null)
                ? authentication.getName()
                : "student@skillsphere.edu";

        CodingSubmissionResultDTO result = codingPracticeService.evaluateAndSubmit(email, request);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/progress")
    public ResponseEntity<CodingProgress> getProgress(Authentication authentication) {
        String email = (authentication != null && authentication.getName() != null)
                ? authentication.getName()
                : "student@skillsphere.edu";
        return ResponseEntity.ok(codingPracticeService.getOrCreateProgress(email));
    }

    @GetMapping("/badges")
    public ResponseEntity<List<CodingBadge>> getBadges(Authentication authentication) {
        String email = (authentication != null && authentication.getName() != null)
                ? authentication.getName()
                : "student@skillsphere.edu";
        return ResponseEntity.ok(codingPracticeService.getBadgesForUser(email));
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<CodingLeaderboard>> getLeaderboard() {
        return ResponseEntity.ok(codingPracticeService.getLeaderboard());
    }
}
