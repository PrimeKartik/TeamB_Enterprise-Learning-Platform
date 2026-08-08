package com.skillsphere.controller;

import com.skillsphere.dto.ModuleQuizDTO;
import com.skillsphere.service.ModuleQuizService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ModuleQuizController {

    private final ModuleQuizService quizService;

    public ModuleQuizController(ModuleQuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/modules/{moduleId}/quiz")
    public ResponseEntity<ModuleQuizDTO> createQuiz(
            @PathVariable Long moduleId,
            @RequestBody ModuleQuizDTO dto) {

        ModuleQuizDTO created = quizService.createQuiz(moduleId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/modules/{moduleId}/quiz")
    public ResponseEntity<ModuleQuizDTO> getQuiz(@PathVariable Long moduleId) {
        try {
            return ResponseEntity.ok(quizService.getQuizByModuleId(moduleId));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/quizzes/{quizId}")
    public ResponseEntity<ModuleQuizDTO> updateQuiz(
            @PathVariable Long quizId,
            @RequestBody ModuleQuizDTO dto) {

        return ResponseEntity.ok(quizService.updateQuiz(quizId, dto));
    }

    @DeleteMapping("/quizzes/{quizId}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long quizId) {
        quizService.deleteQuiz(quizId);
        return ResponseEntity.noContent().build();
    }
}
