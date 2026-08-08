package com.skillsphere.controller;

import com.skillsphere.dto.WishlistItemDTO;
import com.skillsphere.model.Course;
import com.skillsphere.model.User;
import com.skillsphere.model.Wishlist;
import com.skillsphere.repository.CourseRepository;
import com.skillsphere.repository.UserRepository;
import com.skillsphere.repository.WishlistRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public WishlistController(
            WishlistRepository wishlistRepository,
            UserRepository userRepository,
            CourseRepository courseRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    // ================================
    // GET MY WISHLIST
    // Returns only the courses saved by the currently authenticated user —
    // scoped by user_id at the database level, not by anything client-side.
    // ================================
    @GetMapping
    public ResponseEntity<List<WishlistItemDTO>> myWishlist(Authentication authentication) {

        String email = authentication.getName();

        List<WishlistItemDTO> items = wishlistRepository.findByUser_Email(email)
                .stream()
                .map(WishlistItemDTO::new)
                .toList();

        return ResponseEntity.ok(items);
    }

    // ================================
    // SAVE A COURSE
    // ================================
    @PostMapping("/{courseId}")
    public ResponseEntity<?> save(@PathVariable Long courseId, Authentication authentication) {

        String email = authentication.getName();

        if (wishlistRepository.existsByUser_EmailAndCourse_Id(email, courseId)) {
            return ResponseEntity.ok(Map.of("saved", true));
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        wishlistRepository.save(new Wishlist(user, course));

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("saved", true));
    }

    // ================================
    // REMOVE A COURSE
    // ================================
    @DeleteMapping("/{courseId}")
    public ResponseEntity<?> remove(@PathVariable Long courseId, Authentication authentication) {

        String email = authentication.getName();

        wishlistRepository.deleteByUser_EmailAndCourse_Id(email, courseId);

        return ResponseEntity.ok(Map.of("saved", false));
    }

    // ================================
    // TOGGLE A COURSE (save if absent, remove if present)
    // Convenience endpoint matching the frontend's "toggle" UX.
    // ================================
    @PostMapping("/{courseId}/toggle")
    public ResponseEntity<?> toggle(@PathVariable Long courseId, Authentication authentication) {

        String email = authentication.getName();

        boolean exists = wishlistRepository.existsByUser_EmailAndCourse_Id(email, courseId);

        if (exists) {
            wishlistRepository.deleteByUser_EmailAndCourse_Id(email, courseId);
            return ResponseEntity.ok(Map.of("saved", false));
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        wishlistRepository.save(new Wishlist(user, course));

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("saved", true));
    }
}
