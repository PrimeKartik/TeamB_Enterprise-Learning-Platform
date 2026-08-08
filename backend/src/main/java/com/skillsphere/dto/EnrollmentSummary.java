package com.skillsphere.dto;


import com.skillsphere.model.Course;

import java.time.LocalDateTime;



public class EnrollmentSummary {


    private Long id;

    private Course course;

    private Integer progress;

    private LocalDateTime enrolledAt;



    public EnrollmentSummary(
            Long id,
            Course course,
            Integer progress,
            LocalDateTime enrolledAt
    ){

        this.id = id;

        this.course = course;

        this.progress = progress;

        this.enrolledAt = enrolledAt;

    }



    public Long getId(){

        return id;

    }



    public Course getCourse(){

        return course;

    }



    public Integer getProgress(){

        return progress;

    }



    public LocalDateTime getEnrolledAt(){

        return enrolledAt;

    }


    // Convenience getters — Jackson serialises these as top-level JSON fields
    // so the frontend can read enrollment.courseId, courseTitle, etc. directly.

    public Long getCourseId(){
        return course != null ? course.getId() : null;
    }

    public String getCourseTitle(){
        return course != null ? course.getTitle() : null;
    }

    public String getLevel(){
        return course != null ? course.getLevel() : null;
    }

    public String getDuration(){
        return course != null ? course.getDuration() : null;
    }

}