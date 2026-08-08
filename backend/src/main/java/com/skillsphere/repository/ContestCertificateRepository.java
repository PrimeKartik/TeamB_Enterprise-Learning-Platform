package com.skillsphere.repository;

import com.skillsphere.model.ContestCertificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContestCertificateRepository extends JpaRepository<ContestCertificate, Long> {
    List<ContestCertificate> findByStudentEmail(String studentEmail);
    Optional<ContestCertificate> findByCertificateId(String certificateId);
    Optional<ContestCertificate> findByContestIdAndStudentEmail(Long contestId, String studentEmail);
}
