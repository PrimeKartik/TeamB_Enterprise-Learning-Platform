package com.skillsphere.dto;

import jakarta.validation.constraints.NotNull;

public class EnrollRequest {

    @NotNull
    private Long courseId;

    public EnrollRequest() {}

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
}
