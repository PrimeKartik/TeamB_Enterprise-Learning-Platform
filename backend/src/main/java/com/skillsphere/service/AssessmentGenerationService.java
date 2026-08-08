package com.skillsphere.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillsphere.dto.AssessmentQuestionDTO;
import com.skillsphere.model.Course;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AssessmentGenerationService {

    private static final int QUESTION_COUNT = 10;

    private static final String SYSTEM_INSTRUCTION =
        "You are a quiz generator for an online learning platform called SkillSphere. " +
        "Given a course title, you produce a multiple-choice skill assessment for that exact " +
        "course topic. You ONLY ever respond with raw JSON — no markdown code fences, no prose, " +
        "no explanation before or after. The JSON must be a single array of exactly " +
        QUESTION_COUNT + " question objects. Each object must have exactly these fields: " +
        "\"question\" (string), \"options\" (array of exactly 4 short strings), and " +
        "\"correctIndex\" (integer 0-3, the index into options of the single correct answer). " +
        "Questions must be relevant, technically accurate, unambiguous, and cover a range of " +
        "difficulty appropriate for someone who has just studied that course.";

    private final GeminiService geminiService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AssessmentGenerationService(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    /**
     * Generates a fresh set of questions for the given course every time it
     * is called — no caching, per product requirement that every attempt
     * gets newly generated questions.
     */
    public List<AssessmentQuestionDTO> generateQuestions(Course course) {

        String prompt = "Course title: \"" + course.getTitle() + "\".\n" +
                (course.getSkill() != null && !course.getSkill().isBlank()
                        ? "Primary skill/technology: \"" + course.getSkill() + "\".\n" : "") +
                (course.getLevel() != null && !course.getLevel().isBlank()
                        ? "Level: \"" + course.getLevel() + "\".\n" : "") +
                "Generate exactly " + QUESTION_COUNT + " multiple-choice questions " +
                "testing understanding of this specific course topic.";

        String raw = geminiService.generate(SYSTEM_INSTRUCTION, prompt);

        List<AssessmentQuestionDTO> questions = parseQuestions(raw);

        if (questions.size() != QUESTION_COUNT) {
            throw new RuntimeException(
                    "AI assessment generation returned an unexpected number of questions ("
                            + questions.size() + "). Please try again.");
        }

        return questions;
    }

    private List<AssessmentQuestionDTO> parseQuestions(String raw) {
        String cleaned = stripCodeFences(raw);

        try {
            JsonNode root = objectMapper.readTree(cleaned);

            if (!root.isArray()) {
                throw new RuntimeException("Expected a JSON array of questions");
            }

            List<AssessmentQuestionDTO> result = new ArrayList<>();

            for (JsonNode node : root) {
                String question = node.path("question").asText(null);
                int correctIndex = node.path("correctIndex").asInt(-1);

                List<String> options = new ArrayList<>();
                JsonNode optionsNode = node.path("options");
                if (optionsNode.isArray()) {
                    for (JsonNode opt : optionsNode) {
                        options.add(opt.asText());
                    }
                }

                if (question == null || options.size() != 4 || correctIndex < 0 || correctIndex > 3) {
                    // Skip malformed entries rather than failing the whole batch;
                    // the count check afterwards will catch a bad overall result.
                    continue;
                }

                result.add(new AssessmentQuestionDTO(question, options, correctIndex));
            }

            return result;

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to parse AI-generated assessment questions: " + e.getMessage(), e);
        }
    }

    private String stripCodeFences(String raw) {
        if (raw == null) return "";
        String trimmed = raw.trim();

        if (trimmed.startsWith("```")) {
            int firstNewline = trimmed.indexOf('\n');
            if (firstNewline != -1) {
                trimmed = trimmed.substring(firstNewline + 1);
            }
            int lastFence = trimmed.lastIndexOf("```");
            if (lastFence != -1) {
                trimmed = trimmed.substring(0, lastFence);
            }
        }

        return trimmed.trim();
    }
}
