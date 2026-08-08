package com.skillsphere.service;

import com.skillsphere.dto.ModuleQuizDTO;
import com.skillsphere.dto.QuizQuestionDTO;
import com.skillsphere.model.CourseModule;
import com.skillsphere.model.ModuleQuiz;
import com.skillsphere.model.QuizQuestion;
import com.skillsphere.repository.CourseModuleRepository;
import com.skillsphere.repository.ModuleQuizRepository;
import com.skillsphere.repository.QuizQuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
public class ModuleQuizService {

    private final ModuleQuizRepository quizRepository;
    private final QuizQuestionRepository questionRepository;
    private final CourseModuleRepository moduleRepository;

    public ModuleQuizService(ModuleQuizRepository quizRepository, QuizQuestionRepository questionRepository, CourseModuleRepository moduleRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.moduleRepository = moduleRepository;
    }

    @Transactional
    public ModuleQuizDTO createQuiz(Long moduleId, ModuleQuizDTO dto) {
        CourseModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found"));

        if (quizRepository.findByModuleId(moduleId).isPresent()) {
            throw new RuntimeException("Module already has a quiz");
        }

        ModuleQuiz quiz = new ModuleQuiz();
        quiz.setTitle(dto.getTitle());
        quiz.setDescription(dto.getDescription());
        quiz.setModule(module);

        if (dto.getQuestions() != null) {
            for (QuizQuestionDTO qDto : dto.getQuestions()) {
                QuizQuestion q = new QuizQuestion();
                q.setQuestionText(qDto.getQuestionText());
                q.setOptionA(qDto.getOptionA());
                q.setOptionB(qDto.getOptionB());
                q.setOptionC(qDto.getOptionC());
                q.setOptionD(qDto.getOptionD());
                q.setCorrectAnswer(qDto.getCorrectAnswer());
                quiz.addQuestion(q);
            }
        }

        ModuleQuiz saved = quizRepository.save(quiz);
        return mapToDTO(saved);
    }

    public ModuleQuizDTO getQuizByModuleId(Long moduleId) {
        ModuleQuiz quiz = quizRepository.findByModuleId(moduleId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        return mapToDTO(quiz);
    }

    @Transactional
    public ModuleQuizDTO updateQuiz(Long quizId, ModuleQuizDTO dto) {
        ModuleQuiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        quiz.setTitle(dto.getTitle());
        quiz.setDescription(dto.getDescription());

        // Simple approach: clear and re-add questions
        quiz.getQuestions().clear();
        
        if (dto.getQuestions() != null) {
            for (QuizQuestionDTO qDto : dto.getQuestions()) {
                QuizQuestion q = new QuizQuestion();
                q.setQuestionText(qDto.getQuestionText());
                q.setOptionA(qDto.getOptionA());
                q.setOptionB(qDto.getOptionB());
                q.setOptionC(qDto.getOptionC());
                q.setOptionD(qDto.getOptionD());
                q.setCorrectAnswer(qDto.getCorrectAnswer());
                quiz.addQuestion(q);
            }
        }

        ModuleQuiz updated = quizRepository.save(quiz);
        return mapToDTO(updated);
    }

    @Transactional
    public void deleteQuiz(Long quizId) {
        quizRepository.deleteById(quizId);
    }

    public static ModuleQuizDTO mapToDTO(ModuleQuiz quiz) {
        ModuleQuizDTO dto = new ModuleQuizDTO();
        dto.setId(quiz.getId());
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setModuleId(quiz.getModule().getId());
        
        if (quiz.getQuestions() != null) {
            dto.setQuestions(quiz.getQuestions().stream().map(q -> {
                QuizQuestionDTO qDto = new QuizQuestionDTO();
                qDto.setId(q.getId());
                qDto.setQuestionText(q.getQuestionText());
                qDto.setOptionA(q.getOptionA());
                qDto.setOptionB(q.getOptionB());
                qDto.setOptionC(q.getOptionC());
                qDto.setOptionD(q.getOptionD());
                qDto.setCorrectAnswer(q.getCorrectAnswer());
                return qDto;
            }).collect(Collectors.toList()));
        }
        return dto;
    }
}
