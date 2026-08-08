package com.skillsphere.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class AssessmentCompleteRequest {

    @NotNull
    @Min(0)
    private Integer score;

    @NotNull
    @Min(1)
    private Integer total;

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }
}
