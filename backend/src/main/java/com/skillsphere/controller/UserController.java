package com.skillsphere.controller;

import com.skillsphere.dto.CertificateDTO;
import com.skillsphere.dto.ChangePasswordRequest;
import com.skillsphere.dto.ProfileUpdateRequest;
import com.skillsphere.dto.UserProfileDTO;
import com.skillsphere.model.Certificate;
import com.skillsphere.model.User;
import com.skillsphere.repository.CertificateRepository;
import com.skillsphere.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.skillsphere.model.User;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final CertificateRepository certificateRepository;

        public UserController(
                        UserRepository userRepository,
                        PasswordEncoder passwordEncoder,
                        CertificateRepository certificateRepository) {

                this.userRepository = userRepository;
                this.passwordEncoder = passwordEncoder;
                this.certificateRepository = certificateRepository;
        }

        @GetMapping("/profile")
        public ResponseEntity<UserProfileDTO> getProfile(Authentication authentication) {

                String email = authentication.getName();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                return ResponseEntity.ok(convertToDTO(user));
        }

        @PutMapping("/profile")
        public ResponseEntity<UserProfileDTO> updateProfile(
                        @RequestBody ProfileUpdateRequest request,
                        Authentication authentication) {

                String email = authentication.getName();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                if (request.getName() != null)
                        user.setName(request.getName());

                if (request.getPhone() != null)
                        user.setPhone(request.getPhone());

                if (request.getBio() != null)
                        user.setBio(request.getBio());

                if (request.getAddress() != null)
                        user.setAddress(request.getAddress());

                if (request.getDepartment() != null)
                        user.setDepartment(request.getDepartment());

                if (request.getSemester() != null)
                        user.setSemester(request.getSemester());

                if (request.getLinkedinUrl() != null)
                        user.setLinkedinUrl(request.getLinkedinUrl());

                if (request.getGithubUrl() != null)
                        user.setGithubUrl(request.getGithubUrl());

                if (request.getPortfolioUrl() != null)
                        user.setPortfolioUrl(request.getPortfolioUrl());

                if (request.getAvatarUrl() != null)
                        user.setAvatarUrl(request.getAvatarUrl());

                user = userRepository.save(user);

                return ResponseEntity.ok(convertToDTO(user));
        }

        @PutMapping("/change-password")
        public ResponseEntity<?> changePassword(
                        @RequestBody ChangePasswordRequest request,
                        Authentication authentication) {

                String email = authentication.getName();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                if (user.getPassword() == null) {
                        return ResponseEntity.badRequest().body(
                                        Map.of("message",
                                                        "This account signed up with Google and has no password to change."));
                }

                if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                        return ResponseEntity.badRequest()
                                        .body(Map.of("message", "Current password is incorrect."));
                }

                if (request.getNewPassword() == null || request.getNewPassword().length() < 8) {
                        return ResponseEntity.badRequest()
                                        .body(Map.of("message", "New password must be at least 8 characters."));
                }

                user.setPassword(passwordEncoder.encode(request.getNewPassword()));

                userRepository.save(user);

                return ResponseEntity.ok(
                                Map.of("message", "Password updated successfully."));
        }

        @DeleteMapping("/account")
        public ResponseEntity<?> deleteAccount(Authentication authentication) {
                String email = authentication.getName();
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                userRepository.delete(user);
                return ResponseEntity.ok(Map.of("message", "Account deleted successfully."));
        }

        @GetMapping("/certificates")
        public ResponseEntity<List<CertificateDTO>> getMyCertificates(Authentication authentication) {
                String email = authentication != null ? authentication.getName() : null;
                List<Certificate> certificates = List.of();
                if (email != null) {
                        certificates = certificateRepository.findByStudent_Email(email);
                }
                return ResponseEntity.ok(
                                certificates.stream()
                                                .map(CertificateDTO::new)
                                                .toList());
        }


        private UserProfileDTO convertToDTO(User user) {

                UserProfileDTO dto = new UserProfileDTO();

                dto.setId(user.getId());
                dto.setName(user.getName());
                dto.setEmail(user.getEmail());
                dto.setRole(user.getRole());

                dto.setPhone(user.getPhone());
                dto.setBio(user.getBio());
                dto.setAddress(user.getAddress());

                dto.setDepartment(user.getDepartment());
                dto.setSemester(user.getSemester());

                dto.setLinkedinUrl(user.getLinkedinUrl());
                dto.setGithubUrl(user.getGithubUrl());
                dto.setPortfolioUrl(user.getPortfolioUrl());
                dto.setAvatarUrl(user.getAvatarUrl());

                return dto;
        }
}