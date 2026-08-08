package com.skillsphere.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String to, String otp) {
        logger.info("==========================================");
        logger.info("SECURITY OTP FOR {}: {}", to, otp);
        logger.info("==========================================");

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("SkillSphere Learning Nexus - Password Reset OTP Code");

            String htmlContent = "<div style=\"font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 25px; border: 1px solid #7C3AED; border-radius: 16px; background-color: #0F071B; color: #FFFFFF;\">"
                    + "<h2 style=\"color: #EC4899; text-align: center; font-size: 24px;\">SkillSphere Learning Nexus</h2>"
                    + "<p style=\"color: #E2E8F0;\">Hello,</p>"
                    + "<p style=\"color: #CBD5E1;\">You have requested to reset your password. Use the following 6-digit One-Time Password (OTP) code to complete your verification:</p>"
                    + "<div style=\"text-align: center; margin: 25px 0;\">"
                    + "<span style=\"display: inline-block; background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%); color: #FFFFFF; font-size: 32px; font-weight: 900; letter-spacing: 8px; padding: 12px 30px; border-radius: 12px;\">" + otp + "</span>"
                    + "</div>"
                    + "<p style=\"color: #F59E0B; text-align: center; font-size: 13px;\">⏳ This OTP code will expire in <strong>5 minutes</strong>.</p>"
                    + "<p style=\"color: #94A3B8; font-size: 12px; border-top: 1px solid #334155; pt: 15px; margin-top: 20px;\">If you did not initiate this request, please ignore this email or secure your account.</p>"
                    + "<p style=\"color: #CBD5E1; margin-top: 15px;\">Best regards,<br><strong>The SkillSphere Nexus Team</strong></p>"
                    + "</div>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
            logger.info("OTP verification email sent successfully to {}", to);
        } catch (Exception e) {
            logger.warn("MailSender delivery attempt logged for {}. (OTP: {})", to, otp);
        }
    }

    public void sendPasswordResetEmail(String to, String resetLink) {
        logger.info("DEBUG (Reset Link for {}): {}", to, resetLink);
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("SkillSphere - Password Reset Request");

            String htmlContent = "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;\">"
                    + "<h2 style=\"color: #9333ea; text-align: center;\">SkillSphere</h2>"
                    + "<p>Hello,</p>"
                    + "<p>Click the link below to reset your password:</p>"
                    + "<p><a href=\"" + resetLink + "\">Reset Password Link</a></p>"
                    + "</div>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (Exception e) {
            logger.warn("Password reset link logged for {}: {}", to, resetLink);
        }
    }
}
