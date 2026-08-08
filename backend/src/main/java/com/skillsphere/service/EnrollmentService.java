package com.skillsphere.service;

import com.skillsphere.dto.ContinueLearningDTO;
import com.skillsphere.dto.DashboardCourseDTO;
import com.skillsphere.dto.EnrollRequest;
import com.skillsphere.dto.EnrollmentSummary;
import com.skillsphere.dto.ProgressUpdateRequest;
import com.skillsphere.dto.AssessmentCompleteRequest;
import org.springframework.security.core.Authentication;
import com.skillsphere.dto.ContinueLearningDTO;

import java.util.List;

public interface EnrollmentService {

    EnrollmentSummary enroll(
            EnrollRequest request,
            Authentication authentication);

    List<DashboardCourseDTO> getDashboardCourses(
            Authentication authentication);

    List<EnrollmentSummary> getMyEnrollments(
            Authentication authentication);

    EnrollmentSummary updateProgress(
            Long courseId,
            ProgressUpdateRequest request,
            Authentication authentication);

    ContinueLearningDTO continueLearning(
            Long courseId,
            Authentication authentication
    );

    EnrollmentSummary completeAssessment(
            Long courseId,
            AssessmentCompleteRequest request,
            Authentication authentication
    );
}