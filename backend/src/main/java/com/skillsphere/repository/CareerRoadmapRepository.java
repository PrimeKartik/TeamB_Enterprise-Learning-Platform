package com.skillsphere.repository;

import com.skillsphere.model.CareerRoadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CareerRoadmapRepository extends JpaRepository<CareerRoadmap, Long> {
    Optional<CareerRoadmap> findByRoleKey(String roleKey);
}
