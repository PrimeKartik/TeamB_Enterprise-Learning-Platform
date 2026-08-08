package com.skillsphere.controller;

import com.skillsphere.model.Instructor;
import com.skillsphere.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
@CrossOrigin(origins = "*")
public class InstructorController {

    @Autowired
    private InstructorRepository instructorRepository;

    @GetMapping
    public ResponseEntity<List<Instructor>> getAllInstructors() {
        return ResponseEntity.ok(instructorRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Instructor> createInstructor(@RequestBody Instructor instructor) {
        return ResponseEntity.ok(instructorRepository.save(instructor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instructor> updateInstructor(@PathVariable Long id, @RequestBody Instructor details) {
        return instructorRepository.findById(id)
                .map(ins -> {
                    ins.setName(details.getName());
                    ins.setEmail(details.getEmail());
                    ins.setTitle(details.getTitle());
                    ins.setBio(details.getBio());
                    ins.setAvatarUrl(details.getAvatarUrl());
                    return ResponseEntity.ok(instructorRepository.save(ins));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstructor(@PathVariable Long id) {
        if (instructorRepository.existsById(id)) {
            instructorRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
