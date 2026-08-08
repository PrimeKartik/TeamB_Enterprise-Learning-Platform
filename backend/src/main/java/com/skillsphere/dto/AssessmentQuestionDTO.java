package com.skillsphere.dto;

import java.util.List;

public class AssessmentQuestionDTO {

    private String question;
    private List<String> options;
    private int correctIndex;

    public AssessmentQuestionDTO() {
    }

    public AssessmentQuestionDTO(String question, List<String> options, int correctIndex) {
        this.question = question;
        this.options = options;
        this.correctIndex = correctIndex;
    }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }

    public int getCorrectIndex() { return correctIndex; }
    public void setCorrectIndex(int correctIndex) { this.correctIndex = correctIndex; }
}
