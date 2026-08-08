package com.skillsphere.service;

import com.skillsphere.dto.CourseDTO;

import java.util.List;

public interface AdminCourseService {

    List<CourseDTO> getAllCourses();

    CourseDTO getCourse(Long id);

    CourseDTO createCourse(CourseDTO dto);

    CourseDTO updateCourse(Long id, CourseDTO dto);

    void deleteCourse(Long id);
}