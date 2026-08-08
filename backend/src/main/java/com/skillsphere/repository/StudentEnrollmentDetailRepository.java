package com.skillsphere.repository;

import com.skillsphere.model.StudentEnrollmentDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentEnrollmentDetailRepository extends JpaRepository<StudentEnrollmentDetail, Long> {
    List<StudentEnrollmentDetail> findByCourseName(String courseName);
    List<StudentEnrollmentDetail> findByLearningStatus(String learningStatus);
}
