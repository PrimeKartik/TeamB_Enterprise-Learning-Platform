package com.skillsphere.controller;

import com.skillsphere.model.StudentNote;
import com.skillsphere.repository.StudentNoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class StudentNoteController {

    @Autowired
    private StudentNoteRepository noteRepository;

    @GetMapping("/user/{userId}/lesson/{lessonId}")
    public ResponseEntity<StudentNote> getNote(
            @PathVariable Long userId,
            @PathVariable Long lessonId) {
        Optional<StudentNote> noteOpt = noteRepository.findByUserIdAndLessonId(userId, lessonId);
        return noteOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.ok(new StudentNote(userId, 0L, lessonId, "")));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<StudentNote>> getAllUserNotes(@PathVariable Long userId) {
        return ResponseEntity.ok(noteRepository.findByUserId(userId));
    }

    @PostMapping("/save")
    public ResponseEntity<StudentNote> saveNote(@RequestBody StudentNote request) {
        Optional<StudentNote> existingOpt = noteRepository.findByUserIdAndLessonId(request.getUserId(), request.getLessonId());

        StudentNote noteToSave;
        if (existingOpt.isPresent()) {
            noteToSave = existingOpt.get();
            noteToSave.setNoteText(request.getNoteText());
            noteToSave.setUpdatedAt(LocalDateTime.now());
        } else {
            noteToSave = request;
        }

        StudentNote saved = noteRepository.save(noteToSave);
        return ResponseEntity.ok(saved);
    }
}
