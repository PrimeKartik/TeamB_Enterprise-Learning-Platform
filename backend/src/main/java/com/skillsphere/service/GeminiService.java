package com.skillsphere.service;

import com.skillsphere.dto.ChatRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class GeminiService {

    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String model;

    private static final String GEMINI_URL =
        "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s";

    private static final String SYSTEM_INSTRUCTION =
        "You are SkillSphere AI, a friendly and knowledgeable assistant for the SkillSphere " +
        "learning platform. Your role is to help students with:\n" +
        "- Understanding courses and their content\n" +
        "- Providing learning tips and study strategies\n" +
        "- Explaining technical concepts across various skills\n" +
        "- Guiding students on how to use the SkillSphere platform\n" +
        "- Recommending learning paths and courses\n\n" +
        "Keep your responses concise, helpful, and encouraging. " +
        "Use markdown formatting (bold, lists, code blocks) when it helps clarity. " +
        "If asked about something outside your scope, politely redirect to learning topics.";


    public GeminiService(
        @Value("${gemini.api-key}") String apiKey,
        @Value("${gemini.model:gemini-3.6-flash}") String model
    ) {
        this.apiKey = apiKey;
        this.model = model;
        this.restTemplate = new RestTemplate();
    }


    /**
     * Sends a message (with optional conversation history) to Gemini
     * and returns the text response.
     */
    public String chat(String userMessage, List<ChatRequest.ChatMessage> history) {

        // Build the "contents" array for the Gemini API
        List<Map<String, Object>> contents = new ArrayList<>();

        // Add conversation history
        if (history != null) {
            for (ChatRequest.ChatMessage msg : history) {
                Map<String, Object> turn = new HashMap<>();
                turn.put("role", msg.getRole());
                turn.put("parts", List.of(Map.of("text", msg.getText())));
                contents.add(turn);
            }
        }

        // Add the current user message
        Map<String, Object> currentTurn = new HashMap<>();
        currentTurn.put("role", "user");
        currentTurn.put("parts", List.of(Map.of("text", userMessage)));
        contents.add(currentTurn);

        // Build the request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", contents);

        // System instruction
        Map<String, Object> systemInstruction = new HashMap<>();
        systemInstruction.put("parts", List.of(Map.of("text", SYSTEM_INSTRUCTION)));
        requestBody.put("system_instruction", systemInstruction);

        // Generation config
        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.7);
        generationConfig.put("maxOutputTokens", 1024);
        requestBody.put("generationConfig", generationConfig);

        // Build the URL
        String url = String.format(GEMINI_URL, model, apiKey);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                url, HttpMethod.POST, entity, Map.class
            );

            return extractText(response.getBody());

        } catch (HttpClientErrorException e) {
            System.err.println("[GeminiService] HTTP " + e.getStatusCode()
                + " | Body: " + e.getResponseBodyAsString());
            throw new RuntimeException(
                "Gemini API returned " + e.getStatusCode() + ": "
                + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            System.err.println("[GeminiService] Error: " + e.getMessage());
            throw new RuntimeException("Gemini API error: " + e.getMessage(), e);
        }
    }


    /**
     * Sends a single-turn prompt to Gemini with a custom system instruction
     * and returns the raw text response. Used for structured/JSON generation
     * tasks (e.g. assessment questions) that shouldn't use the chatbot persona.
     */
    public String generate(String systemInstructionText, String userPrompt) {

        List<Map<String, Object>> contents = new ArrayList<>();

        Map<String, Object> currentTurn = new HashMap<>();
        currentTurn.put("role", "user");
        currentTurn.put("parts", List.of(Map.of("text", userPrompt)));
        contents.add(currentTurn);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", contents);

        Map<String, Object> systemInstruction = new HashMap<>();
        systemInstruction.put("parts", List.of(Map.of("text", systemInstructionText)));
        requestBody.put("system_instruction", systemInstruction);

        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.9);
        generationConfig.put("maxOutputTokens", 4096);
        requestBody.put("generationConfig", generationConfig);

        String url = String.format(GEMINI_URL, model, apiKey);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                url, HttpMethod.POST, entity, Map.class
            );

            return extractText(response.getBody());

        } catch (HttpClientErrorException e) {
            System.err.println("[GeminiService] HTTP " + e.getStatusCode()
                + " | Body: " + e.getResponseBodyAsString());
            throw new RuntimeException(
                "Gemini API returned " + e.getStatusCode() + ": "
                + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            System.err.println("[GeminiService] Error: " + e.getMessage());
            throw new RuntimeException("Gemini API error: " + e.getMessage(), e);
        }
    }


    /**
     * Extracts the text content from the Gemini API response.
     */
    @SuppressWarnings("unchecked")
    private String extractText(Map response) {
        try {
            List<Map<String, Object>> candidates =
                (List<Map<String, Object>>) response.get("candidates");

            Map<String, Object> firstCandidate = candidates.get(0);

            Map<String, Object> content =
                (Map<String, Object>) firstCandidate.get("content");

            List<Map<String, Object>> parts =
                (List<Map<String, Object>>) content.get("parts");

            return (String) parts.get(0).get("text");

        } catch (Exception e) {
            return "I'm sorry, I couldn't process your request right now. Please try again.";
        }
    }
}
