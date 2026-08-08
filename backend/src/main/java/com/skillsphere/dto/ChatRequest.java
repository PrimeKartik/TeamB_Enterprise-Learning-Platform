package com.skillsphere.dto;

import java.util.ArrayList;
import java.util.List;

public class ChatRequest {

    private String message;
    private List<ChatMessage> history = new ArrayList<>();

    public ChatRequest() {}

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<ChatMessage> getHistory() {
        return history;
    }

    public void setHistory(List<ChatMessage> history) {
        this.history = history;
    }

    /**
     * Represents a single turn in the conversation history.
     */
    public static class ChatMessage {
        private String role;   // "user" or "model"
        private String text;

        public ChatMessage() {}

        public ChatMessage(String role, String text) {
            this.role = role;
            this.text = text;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }
}
