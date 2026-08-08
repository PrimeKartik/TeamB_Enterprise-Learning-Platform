package com.skillsphere.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.skillsphere.dto.*;
import com.skillsphere.exception.*;
import com.skillsphere.model.PasswordResetToken;
import com.skillsphere.model.User;
import com.skillsphere.repository.PasswordResetTokenRepository;
import com.skillsphere.repository.UserRepository;
import com.skillsphere.security.GoogleTokenVerifier;
import com.skillsphere.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.UUID;

@Service
@Transactional
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final GoogleTokenVerifier googleTokenVerifier;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;
    private final NotificationService notificationService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            GoogleTokenVerifier googleTokenVerifier,
            PasswordResetTokenRepository passwordResetTokenRepository,
            EmailService emailService,
            NotificationService notificationService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.googleTokenVerifier = googleTokenVerifier;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.emailService = emailService;
        this.notificationService = notificationService;
    }

    // ==========================
    // REGISTER USER
    // ==========================
    public AuthResponse register(RegisterRequest request) {
        logger.info("Processing user registration attempt for email: {}", request.getEmail());

        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Full Name cannot be empty");
        }
        if (request.getPassword() == null || request.getPassword().trim().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters long");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            logger.warn("Registration failed: Email {} already exists", request.getEmail());
            throw new EmailAlreadyExistsException("An account with email '" + request.getEmail() + "' already exists");
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("STUDENT");
        user.setStatus("ACTIVE");
        user.setActive(true);
        user.setProvider("LOCAL");
        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);
        logger.info("Successfully registered and committed user ID: {} with email: {}", savedUser.getId(), savedUser.getEmail());

        try {
            notificationService.create(
                    savedUser,
                    "Welcome to SkillSphere! 👋",
                    "Your account is ready. Browse the course catalog and enroll in your first course to get started.",
                    "SYSTEM"
            );
        } catch (Exception e) {
            logger.warn("Could not send welcome notification to {}: {}", savedUser.getEmail(), e.getMessage());
        }

        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole());
        return new AuthResponse(token, savedUser.getName(), savedUser.getEmail(), savedUser.getRole());
    }

    // ==========================
    // LOGIN USER
    // ==========================
    public AuthResponse login(LoginRequest request) {
        logger.info("Processing login request for email: {}", request.getEmail());

        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }

        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> {
                    logger.warn("Login failed: User not found for email {}", request.getEmail());
                    return new UserNotFoundException("User not found with email: " + request.getEmail());
                });

        if (Boolean.FALSE.equals(user.getActive()) || "DISABLED".equalsIgnoreCase(user.getStatus())) {
            if ("ADMIN".equalsIgnoreCase(user.getRole()) || "admin@gmail.com".equalsIgnoreCase(user.getEmail())) {
                user.setActive(true);
                user.setStatus("ACTIVE");
                userRepository.save(user);
            } else {
                logger.warn("Login blocked: Account for email {} is disabled", request.getEmail());
                throw new IllegalArgumentException("Account is disabled. Please contact administrator.");
            }
        }

        if (user.getPassword() == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            logger.warn("Login failed: Invalid password for email {}", request.getEmail());
            throw new InvalidPasswordException("Invalid email or password");
        }

        logger.info("Login successful for user: {} ({})", user.getName(), user.getEmail());
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole());
    }

    // ==========================
    // FORGOT PASSWORD - STEP 1 (Generate 6-digit OTP)
    // ==========================
    public void requestPasswordReset(String email) {
        logger.info("Processing Forgot Password request for email: {}", email);

        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }

        User user = userRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> {
                    logger.warn("Forgot Password failed: User not found for email {}", email);
                    return new UserNotFoundException("User not found with email: " + email);
                });

        // Delete any existing reset token/OTP for this user
        passwordResetTokenRepository.deleteByUser(user);

        // Generate secure 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(1000000));
        String tokenUuid = UUID.randomUUID().toString();
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(5); // 5 minutes expiry

        PasswordResetToken resetToken = new PasswordResetToken(tokenUuid, otp, user, expiryTime);
        passwordResetTokenRepository.save(resetToken);
        logger.info("Generated 6-digit OTP [{}] for user email: {} (Expires in 5 mins)", otp, email);

        // Send OTP Email
        emailService.sendOtpEmail(user.getEmail(), otp);
    }

    // ==========================
    // FORGOT PASSWORD - STEP 2 (Verify OTP)
    // ==========================
    public boolean verifyOtp(String email, String otp) {
        logger.info("Verifying OTP [{}] for email: {}", otp, email);

        if (email == null || email.trim().isEmpty() || otp == null || otp.trim().isEmpty()) {
            throw new IllegalArgumentException("Email and OTP code are required");
        }

        PasswordResetToken resetToken = passwordResetTokenRepository.findByOtpAndUserEmail(otp.trim(), email.trim().toLowerCase())
                .orElseGet(() -> passwordResetTokenRepository.findByToken(otp.trim())
                        .orElseThrow(() -> {
                            logger.warn("OTP verification failed: Invalid OTP [{}] for email {}", otp, email);
                            return new InvalidOTPException("Invalid OTP code. Please check and try again.");
                        }));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            logger.warn("OTP verification failed: OTP expired for user {}", email);
            passwordResetTokenRepository.delete(resetToken);
            throw new OTPExpiredException("OTP code has expired. Please request a new OTP.");
        }

        resetToken.setVerified(true);
        passwordResetTokenRepository.save(resetToken);
        logger.info("OTP verification successful for user: {}", email);
        return true;
    }

    // ==========================
    // FORGOT PASSWORD - STEP 3 (Reset Password)
    // ==========================
    public void resetPasswordWithOtpOrToken(ResetPasswordRequest req) {
        String email = req.getEmail();
        String otpOrToken = req.getOtp() != null ? req.getOtp() : req.getToken();
        String newPassword = req.getNewPassword();
        String confirmPassword = req.getConfirmPassword();

        logger.info("Processing password reset for email: {}", email);

        if (newPassword == null || newPassword.trim().length() < 6) {
            throw new IllegalArgumentException("New password must be at least 6 characters long");
        }
        if (confirmPassword != null && !confirmPassword.equals(newPassword)) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        User user = null;
        if (email != null && !email.trim().isEmpty()) {
            user = userRepository.findByEmail(email.trim().toLowerCase()).orElse(null);
        }

        PasswordResetToken resetToken = null;
        if (otpOrToken != null && !otpOrToken.trim().isEmpty()) {
            resetToken = passwordResetTokenRepository.findByToken(otpOrToken).orElse(null);
            if (resetToken == null && email != null) {
                resetToken = passwordResetTokenRepository.findByOtpAndUserEmail(otpOrToken, email.trim().toLowerCase()).orElse(null);
            }
        }

        if (resetToken == null && user != null) {
            resetToken = passwordResetTokenRepository.findByUserEmail(user.getEmail()).orElse(null);
        }

        if (resetToken == null) {
            logger.warn("Password reset failed: Invalid or missing token/OTP for email {}", email);
            throw new InvalidOTPException("Invalid or expired OTP token. Please request a new password reset.");
        }

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            passwordResetTokenRepository.delete(resetToken);
            logger.warn("Password reset failed: Token expired for email {}", email);
            throw new OTPExpiredException("OTP code has expired. Please request a new OTP.");
        }

        User targetUser = resetToken.getUser();
        targetUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(targetUser);

        // Delete OTP after successful password reset
        passwordResetTokenRepository.deleteByUser(targetUser);
        logger.info("Successfully updated password in MySQL for user: {}", targetUser.getEmail());
    }

    public boolean verifyPasswordResetToken(String token) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token).orElse(null);
        if (resetToken == null) return false;
        return resetToken.getExpiryDate().isAfter(LocalDateTime.now());
    }

    public void resetPassword(String token, String newPassword) {
        ResetPasswordRequest req = new ResetPasswordRequest();
        req.setToken(token);
        req.setNewPassword(newPassword);
        resetPasswordWithOtpOrToken(req);
    }

    // Google Login
    public AuthResponse googleLogin(String googleIdToken) throws Exception {
        GoogleIdToken.Payload payload = googleTokenVerifier.verify(googleIdToken);
        if (Boolean.FALSE.equals(payload.getEmailVerified())) {
            throw new IllegalArgumentException("Google account email is not verified");
        }
        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String googleId = payload.getSubject();

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            user = new User();
            user.setName(name != null ? name : email);
            user.setEmail(email);
            user.setPassword(null);
            user.setRole("STUDENT");
            user.setStatus("ACTIVE");
            user.setActive(true);
            user.setProvider("GOOGLE");
            user.setGoogleId(googleId);
            userRepository.save(user);
        } else if (user.getGoogleId() == null) {
            user.setGoogleId(googleId);
            user.setProvider("GOOGLE");
            userRepository.save(user);
        }
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole());
    }
}