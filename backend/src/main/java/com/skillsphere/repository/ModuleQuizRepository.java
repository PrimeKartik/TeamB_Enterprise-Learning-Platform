package com.skillsphere.repository;

import com.skillsphere.model.ModuleQuiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ModuleQuizRepository extends JpaRepository<ModuleQuiz, Long> {
    Optional<ModuleQuiz> findByModuleId(Long moduleId);

    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.transaction.annotation.Transactional
    void deleteByModuleId(Long moduleId);
}
