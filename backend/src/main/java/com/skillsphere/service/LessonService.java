package com.skillsphere.service;

import com.skillsphere.dto.LessonDTO;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface LessonService {

    List<LessonDTO> getLessons(
            Long courseId,
            Authentication authentication
    );

    LessonDTO getLesson(
            Long lessonId,
            Authentication authentication
    );

    void completeLesson(
            Long lessonId,
            Authentication authentication
    );
}