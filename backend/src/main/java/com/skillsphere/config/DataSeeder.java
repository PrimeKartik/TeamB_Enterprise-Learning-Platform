package com.skillsphere.config;

import com.skillsphere.model.User;
import com.skillsphere.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class DataSeeder implements CommandLineRunner {

    private static final String ADMIN_EMAIL = "admin@gmail.com";
    private static final String ADMIN_PASSWORD = "superadmin"; // change after first login in a real deployment

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        User admin = userRepository.findByEmail(ADMIN_EMAIL).orElseGet(() -> {
            User newAdmin = new User();
            newAdmin.setEmail(ADMIN_EMAIL);
            newAdmin.setName("SkillSphere Admin");
            newAdmin.setRole("ADMIN");
            newAdmin.setProvider("LOCAL");
            return newAdmin;
        });

        admin.setPassword(passwordEncoder.encode(ADMIN_PASSWORD));
        admin.setActive(true);
        admin.setStatus("ACTIVE");
        admin.setRole("ADMIN");
        userRepository.save(admin);

        System.out.println("=========================================================");
        System.out.println(" Default admin account verified/updated:");
        System.out.println("   email:    " + ADMIN_EMAIL);
        System.out.println("   password: " + ADMIN_PASSWORD);
        System.out.println("   status:   ACTIVE");
        System.out.println("=========================================================");

        if (!userRepository.existsByEmail("gayatrisenthamarai@gmail.com")) {
            User student = new User();
            student.setName("Student");
            student.setEmail("gayatrisenthamarai@gmail.com");
            student.setPassword(passwordEncoder.encode("password123"));
            student.setRole("STUDENT");
            student.setProvider("LOCAL");
            student.setActive(true);
            student.setStatus("ACTIVE");
            userRepository.save(student);
            System.out.println(" Seeded student gayatrisenthamarai@gmail.com");
        }
    }
}
