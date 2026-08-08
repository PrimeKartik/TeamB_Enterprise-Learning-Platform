package com.skillsphere.dto;

public class AssessmentSummaryDTO {

    private Long courseId;
    private String courseTitle;
    private String description;
    private int duration; // minutes
    private int questionCount;

    public AssessmentSummaryDTO() {
    }

    public AssessmentSummaryDTO(Long courseId, String courseTitle, String description, int duration, int questionCount) {
        this.courseId = courseId;
        this.courseTitle = courseTitle;
        this.description = description;
        this.duration = duration;
        this.questionCount = questionCount;
    }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }

    public int getQuestionCount() { return questionCount; }
    public void setQuestionCount(int questionCount) { this.questionCount = questionCount; }
}
