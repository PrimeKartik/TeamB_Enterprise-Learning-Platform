package com.skillsphere.controller;

import com.skillsphere.dto.CodingSubmissionRequest;
import com.skillsphere.dto.CodingSubmissionResultDTO;
import com.skillsphere.dto.StudentContestStatsDTO;
import com.skillsphere.model.*;
import com.skillsphere.service.ContestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contests")
@CrossOrigin(origins = "*")
public class ContestController {

    private final ContestService contestService;

    public ContestController(ContestService contestService) {
        this.contestService = contestService;
    }

    @GetMapping
    public ResponseEntity<List<Contest>> getContests(@RequestParam(required = false) String status) {
        if (status != null && !status.isEmpty()) {
            return ResponseEntity.ok(contestService.getContestsByStatus(status));
        }
        return ResponseEntity.ok(contestService.getAllContests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contest> getContestById(@PathVariable Long id) {
        return contestService.getContestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/register")
    public ResponseEntity<ContestRegistration> registerForContest(
            @PathVariable Long id,
            Authentication authentication) {
        String email = (authentication != null && authentication.getName() != null)
                ? authentication.getName()
                : "student@skillsphere.edu";
        ContestRegistration reg = contestService.registerUserForContest(id, email, "Student");
        return ResponseEntity.ok(reg);
    }

    @GetMapping("/{id}/questions")
    public ResponseEntity<List<ContestQuestion>> getContestQuestions(@PathVariable Long id) {
        return ResponseEntity.ok(contestService.getQuestionsForContest(id));
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<CodingSubmissionResultDTO> submitSolution(
            @PathVariable Long id,
            Authentication authentication,
            @RequestBody CodingSubmissionRequest req) {
        String email = (authentication != null && authentication.getName() != null)
                ? authentication.getName()
                : "student@skillsphere.edu";
        CodingSubmissionResultDTO result = contestService.evaluateContestSubmission(email, "Student", id, req);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}/leaderboard")
    public ResponseEntity<List<ContestLeaderboard>> getLeaderboard(@PathVariable Long id) {
        return ResponseEntity.ok(contestService.getContestLeaderboard(id));
    }

    @GetMapping("/{id}/certificate")
    public ResponseEntity<ContestCertificate> getCertificate(
            @PathVariable Long id,
            Authentication authentication) {
        String email = (authentication != null && authentication.getName() != null)
                ? authentication.getName()
                : "student@skillsphere.edu";
        ContestCertificate cert = contestService.getOrCreateCertificate(id, email, "Kavipriya S");
        return ResponseEntity.ok(cert);
    }

    @GetMapping("/certificates/verify/{certificateId}")
    public ResponseEntity<ContestCertificate> verifyCertificate(@PathVariable String certificateId) {
        return contestService.verifyCertificate(certificateId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/discussions")
    public ResponseEntity<List<ContestDiscussion>> getDiscussions(@PathVariable Long id) {
        return ResponseEntity.ok(contestService.getDiscussions(id));
    }

    @PostMapping("/{id}/discussions")
    public ResponseEntity<ContestDiscussion> addDiscussion(
            @PathVariable Long id,
            Authentication authentication,
            @RequestBody Map<String, String> body) {
        String email = (authentication != null && authentication.getName() != null)
                ? authentication.getName()
                : "student@skillsphere.edu";
        String comment = body.getOrDefault("commentText", "");
        ContestDiscussion d = contestService.addDiscussionComment(id, email, "Student", comment);
        return ResponseEntity.ok(d);
    }

    @GetMapping("/stats")
    public ResponseEntity<StudentContestStatsDTO> getStudentStats(Authentication authentication) {
        String email = (authentication != null && authentication.getName() != null)
                ? authentication.getName()
                : "student@skillsphere.edu";
        return ResponseEntity.ok(contestService.getStudentStats(email));
    }

    // Admin APIs
    @PostMapping
    public ResponseEntity<Contest> createContest(@RequestBody Contest contest) {
        return ResponseEntity.ok(contestService.saveContest(contest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contest> updateContest(@PathVariable Long id, @RequestBody Contest contest) {
        contest.setId(id);
        return ResponseEntity.ok(contestService.saveContest(contest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContest(@PathVariable Long id) {
        contestService.deleteContest(id);
        return ResponseEntity.noContent().build();
    }
}
