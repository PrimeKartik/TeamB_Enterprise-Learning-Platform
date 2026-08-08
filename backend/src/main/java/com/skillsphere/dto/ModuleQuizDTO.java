package com.skillsphere.dto;

import java.util.List;

public class ModuleQuizDTO {
    private Long id;
    private String title;
    private String description;
    private Long moduleId;
    private List<QuizQuestionDTO> questions;

    public ModuleQuizDTO() {
    }

    public ModuleQuizDTO(Long id, String title, String description, Long moduleId, List<QuizQuestionDTO> questions) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.moduleId = moduleId;
        this.questions = questions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getModuleId() {
        return moduleId;
    }

    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
    }

    public List<QuizQuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuizQuestionDTO> questions) {
        this.questions = questions;
    }
}
