package com.skillsphere.controller;

import com.skillsphere.dto.ModuleDTO;
import com.skillsphere.model.CourseModule;
import com.skillsphere.service.ModuleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ModuleController {

    private final ModuleService moduleService;

    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @GetMapping("/courses/{courseId}/modules")
    public List<ModuleDTO> getModules(
            @PathVariable Long courseId,
            Authentication authentication) {

        if (authentication != null && authentication.isAuthenticated()) {
            try {
                return moduleService.getModulesWithLessons(courseId, authentication);
            } catch (RuntimeException e) {
                return moduleService.getModulesByCourse(courseId);
            }
        }

        return moduleService.getModulesByCourse(courseId);
    }

    @PostMapping("/courses/{courseId}/modules")
    public ResponseEntity<ModuleDTO> createModule(
            @PathVariable Long courseId,
            @RequestBody CourseModule module) {

        ModuleDTO created = moduleService.createModule(courseId, module);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/modules/{moduleId}")
    public ResponseEntity<ModuleDTO> updateModule(
            @PathVariable Long moduleId,
            @RequestBody CourseModule module) {

        return ResponseEntity.ok(moduleService.updateModule(moduleId, module));
    }

    @DeleteMapping("/modules/{moduleId}")
    public ResponseEntity<Void> deleteModule(
            @PathVariable Long moduleId) {

        moduleService.deleteModule(moduleId);
        return ResponseEntity.noContent().build();
    }
}
