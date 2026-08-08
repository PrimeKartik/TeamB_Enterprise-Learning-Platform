package com.skillsphere.controller;

import com.skillsphere.dto.NewsletterRequest;
import com.skillsphere.model.Subscriber;
import com.skillsphere.repository.SubscriberRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/newsletter")
public class NewsletterController {

    private final SubscriberRepository subscriberRepository;

    public NewsletterController(SubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@Valid @RequestBody NewsletterRequest request) {
        // Idempotent: re-subscribing with the same email is not an error
        if (!subscriberRepository.existsByEmail(request.getEmail())) {
            subscriberRepository.save(new Subscriber(request.getEmail()));
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
