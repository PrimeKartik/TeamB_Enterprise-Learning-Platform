package com.skillsphere.service;

import com.skillsphere.dto.NotificationDTO;
import com.skillsphere.model.User;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface NotificationService {

    void create(User user, String title, String message, String type);

    List<NotificationDTO> getMyNotifications(Authentication authentication);

    NotificationDTO markAsRead(Long id, Authentication authentication);

    void markAllAsRead(Authentication authentication);
}
