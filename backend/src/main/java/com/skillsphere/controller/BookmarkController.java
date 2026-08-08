package com.skillsphere.controller;

import com.skillsphere.model.Bookmark;
import com.skillsphere.repository.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookmarks")
@CrossOrigin(origins = "*")
public class BookmarkController {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Bookmark>> getUserBookmarks(@PathVariable Long userId) {
        return ResponseEntity.ok(bookmarkRepository.findByUserId(userId));
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> checkBookmark(
            @RequestParam Long userId,
            @RequestParam Long lessonId) {
        boolean bookmarked = bookmarkRepository.existsByUserIdAndLessonId(userId, lessonId);
        Map<String, Boolean> res = new HashMap<>();
        res.put("bookmarked", bookmarked);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/toggle")
    @Transactional
    public ResponseEntity<Map<String, Object>> toggleBookmark(@RequestBody Bookmark request) {
        Map<String, Object> response = new HashMap<>();
        boolean exists = bookmarkRepository.existsByUserIdAndLessonId(request.getUserId(), request.getLessonId());

        if (exists) {
            bookmarkRepository.deleteByUserIdAndLessonId(request.getUserId(), request.getLessonId());
            response.put("bookmarked", false);
            response.put("message", "Bookmark removed");
        } else {
            Bookmark saved = bookmarkRepository.save(new Bookmark(request.getUserId(), request.getCourseId(), request.getLessonId()));
            response.put("bookmarked", true);
            response.put("bookmark", saved);
            response.put("message", "Bookmark added");
        }

        return ResponseEntity.ok(response);
    }
}
