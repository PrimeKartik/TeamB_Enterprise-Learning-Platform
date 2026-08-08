package com.skillsphere.service;

import com.skillsphere.dto.ModuleDTO;
import com.skillsphere.model.CourseModule;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ModuleService {

    List<ModuleDTO> getModulesByCourse(Long courseId);

    List<ModuleDTO> getModulesWithLessons(
            Long courseId,
            Authentication authentication);

    ModuleDTO createModule(Long courseId, CourseModule module);

    ModuleDTO updateModule(Long moduleId, CourseModule updated);

    void deleteModule(Long moduleId);
}
