package com.skillsphere.repository;

import com.skillsphere.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    
    long countByRole(String role);
    List<User> findByCreatedAtAfter(java.time.LocalDateTime date);
    List<User> findByRole(String role);
    long countByRoleAndActive(String role, Boolean active);
}
