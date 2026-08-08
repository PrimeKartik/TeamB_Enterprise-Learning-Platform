package com.skillsphere.repository;

import com.skillsphere.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import java.util.List;
import com.skillsphere.dto.CourseAdminDTO;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT new com.skillsphere.dto.CourseAdminDTO(c, COUNT(e.id), COUNT(CASE WHEN e.progress >= 100 THEN 1 ELSE null END)) " +
           "FROM Course c LEFT JOIN Enrollment e ON c.id = e.course.id AND e.user.role = 'STUDENT' " +
           "GROUP BY c.id")
    List<CourseAdminDTO> findAllWithStats();
}
