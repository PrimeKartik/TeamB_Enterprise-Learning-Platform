package com.skillsphere.controller;

import com.skillsphere.dto.LessonDTO;
import com.skillsphere.service.LessonService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LessonController {

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/courses/{courseId}/lessons")
    public List<LessonDTO> getLessons(
            @PathVariable Long courseId,
            Authentication authentication
    ) {
        return lessonService.getLessons(courseId, authentication);
    }

    @GetMapping("/lessons/{lessonId}")
    public LessonDTO getLesson(
            @PathVariable Long lessonId,
            Authentication authentication
    ) {
        return lessonService.getLesson(lessonId, authentication);
    }

    @PatchMapping("/lessons/{lessonId}/complete")
    public ResponseEntity<Void> completeLesson(
            @PathVariable Long lessonId,
            Authentication authentication
    ) {

        lessonService.completeLesson(
                lessonId,
                authentication
        );

        return ResponseEntity.ok().build();
    }
}