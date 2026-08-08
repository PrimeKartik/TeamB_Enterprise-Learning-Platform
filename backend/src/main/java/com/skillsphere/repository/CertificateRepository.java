package com.skillsphere.repository;

import com.skillsphere.model.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {

    List<Certificate> findAllByOrderByIssueDateDesc();

    List<Certificate> findByStudent_Email(String email);

    List<Certificate> findByStudent_Id(Long studentId);

    Optional<Certificate> findByCertificateIdIgnoreCase(String certificateId);

    Optional<Certificate> findByVerificationToken(String verificationToken);

    boolean existsByStudent_EmailAndCourse_Id(String email, Long courseId);

    void deleteByCourse_Id(Long courseId);

    long countByStudent_Role(String role);

    long count();
}