package com.skillsphere.dto;

import java.util.ArrayList;
import java.util.List;

public class ModuleDTO {

    private Long id;

    private String title;

    private String description;

    private String youtubeLink;

    private String referenceBook;

    private Integer moduleOrder;

    private List<LessonDTO> lessons = new ArrayList<>();

    private ModuleQuizDTO quiz;

    public ModuleDTO() {
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

    public Integer getModuleOrder() {
        return moduleOrder;
    }

    public void setModuleOrder(Integer moduleOrder) {
        this.moduleOrder = moduleOrder;
    }

    public List<LessonDTO> getLessons() {
        return lessons;
    }

    public void setLessons(List<LessonDTO> lessons) {
        this.lessons = lessons;
    }

    public ModuleQuizDTO getQuiz() {
        return quiz;
    }

    public void setQuiz(ModuleQuizDTO quiz) {
        this.quiz = quiz;
    }

    public String getYoutubeLink() {
        return youtubeLink;
    }

    public void setYoutubeLink(String youtubeLink) {
        this.youtubeLink = youtubeLink;
    }

    public String getReferenceBook() {
        return referenceBook;
    }

    public void setReferenceBook(String referenceBook) {
        this.referenceBook = referenceBook;
    }
}
