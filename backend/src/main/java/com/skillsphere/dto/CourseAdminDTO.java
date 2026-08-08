package com.skillsphere.dto;

import com.skillsphere.model.Course;
import com.fasterxml.jackson.annotation.JsonUnwrapped;

public class CourseAdminDTO {

    @JsonUnwrapped
    private Course course;
    private long enrolledCount;
    private long completedCount;

    public CourseAdminDTO(Course course, long enrolledCount, long completedCount) {
        this.course = course;
        this.enrolledCount = enrolledCount;
        this.completedCount = completedCount;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public long getEnrolledCount() {
        return enrolledCount;
    }

    public void setEnrolledCount(long enrolledCount) {
        this.enrolledCount = enrolledCount;
    }

    public long getCompletedCount() {
        return completedCount;
    }

    public void setCompletedCount(long completedCount) {
        this.completedCount = completedCount;
    }
}
