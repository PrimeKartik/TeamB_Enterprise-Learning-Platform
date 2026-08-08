package com.skillsphere.dto;

public class CodingSubmissionRequest {
    private Long questionId;
    private String language;
    private String code;
    private String selectedAnswer; // For MCQ/Prediction types

    public CodingSubmissionRequest() {}

    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getSelectedAnswer() { return selectedAnswer; }
    public void setSelectedAnswer(String selectedAnswer) { this.selectedAnswer = selectedAnswer; }
}
