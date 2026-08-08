package com.skillsphere.dto;

public class ContinueLearningDTO {

    private Long courseId;
    private Long lessonId;
    private String lessonTitle;

    public ContinueLearningDTO() {
    }

    public ContinueLearningDTO(
            Long courseId,
            Long lessonId,
            String lessonTitle) {

        this.courseId = courseId;
        this.lessonId = lessonId;
        this.lessonTitle = lessonTitle;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }

    public String getLessonTitle() {
        return lessonTitle;
    }

    public void setLessonTitle(String lessonTitle) {
        this.lessonTitle = lessonTitle;
    }
}