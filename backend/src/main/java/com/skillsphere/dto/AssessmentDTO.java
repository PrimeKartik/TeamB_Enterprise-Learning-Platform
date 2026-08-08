package com.skillsphere.dto;

import java.util.List;

public class AssessmentDTO {

    private Long courseId;
    private String courseTitle;
    private int duration; // minutes
    private List<AssessmentQuestionDTO> questions;

    public AssessmentDTO() {
    }

    public AssessmentDTO(Long courseId, String courseTitle, int duration, List<AssessmentQuestionDTO> questions) {
        this.courseId = courseId;
        this.courseTitle = courseTitle;
        this.duration = duration;
        this.questions = questions;
    }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }

    public List<AssessmentQuestionDTO> getQuestions() { return questions; }
    public void setQuestions(List<AssessmentQuestionDTO> questions) { this.questions = questions; }
}
