package com.skillsphere.repository;

import com.skillsphere.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface EnrollmentRepository 
extends JpaRepository<Enrollment,Long>{


    List<Enrollment> findByUser_Email(String email);


    boolean existsByUser_EmailAndCourse_Id(
            String email,
            Long courseId
    );


    Optional<Enrollment> findByUser_EmailAndCourse_Id(
            String email,
            Long courseId
    );

    long countByProgress(Integer progress);

    void deleteByCourse_Id(Long courseId);

}