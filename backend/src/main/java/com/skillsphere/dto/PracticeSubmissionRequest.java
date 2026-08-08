package com.skillsphere.dto;

import java.util.Map;

public class PracticeSubmissionRequest {
    private Long courseId;
    private String moduleName;
    private Map<Long, String> answers; // questionId -> answerText or optionLabel

    public PracticeSubmissionRequest() {}

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getModuleName() { return moduleName; }
    public void setModuleName(String moduleName) { this.moduleName = moduleName; }

    public Map<Long, String> getAnswers() { return answers; }
    public void setAnswers(Map<Long, String> answers) { this.answers = answers; }
}
