package com.skillsphere.repository;

import com.skillsphere.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    List<Wishlist> findByUser_Email(String email);

    Optional<Wishlist> findByUser_EmailAndCourse_Id(String email, Long courseId);

    boolean existsByUser_EmailAndCourse_Id(String email, Long courseId);

    void deleteByUser_EmailAndCourse_Id(String email, Long courseId);

    void deleteByCourse_Id(Long courseId);
}
