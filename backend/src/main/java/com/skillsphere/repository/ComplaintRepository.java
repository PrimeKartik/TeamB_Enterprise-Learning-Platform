package com.skillsphere.repository;

import com.skillsphere.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByStudentEmailOrderByCreatedAtDesc(String studentEmail);
    List<Complaint> findAllByOrderByCreatedAtDesc();
}
