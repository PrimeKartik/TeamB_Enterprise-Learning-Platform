package com.skillsphere.controller;

import com.skillsphere.dto.ChatRequest;
import com.skillsphere.dto.ChatResponse;
import com.skillsphere.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }


    @PostMapping
    public ResponseEntity<ChatResponse> chat(
        @RequestBody ChatRequest request
    ) {
        try {
            String reply = geminiService.chat(
                request.getMessage(),
                request.getHistory()
            );
            return ResponseEntity.ok(new ChatResponse(reply));

        } catch (Exception e) {
            System.err.println("[ChatController] Error: " + e.getMessage());
            return ResponseEntity
                .internalServerError()
                .body(new ChatResponse("Error: " + e.getMessage()));
        }
    }
}
