package com.skillsphere.repository;

import com.skillsphere.model.PasswordResetToken;
import com.skillsphere.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    Optional<PasswordResetToken> findByOtpAndUserEmail(String otp, String userEmail);
    Optional<PasswordResetToken> findByUserEmail(String userEmail);
    void deleteByUser(User user);
}
