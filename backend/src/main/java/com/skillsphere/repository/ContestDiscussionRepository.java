package com.skillsphere.repository;

import com.skillsphere.model.ContestDiscussion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContestDiscussionRepository extends JpaRepository<ContestDiscussion, Long> {
    List<ContestDiscussion> findByContestIdOrderByCreatedAtDesc(Long contestId);
}
