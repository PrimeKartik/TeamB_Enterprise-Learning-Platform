package com.skillsphere.repository;

import com.skillsphere.model.CourseModule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseModuleRepository extends JpaRepository<CourseModule, Long> {

    List<CourseModule> findByCourseIdOrderByModuleOrderAsc(Long courseId);

    void deleteByCourseId(Long courseId);

    long countByCourseId(Long courseId);
}
