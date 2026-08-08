package com.skillsphere.service;

import com.skillsphere.dto.NotificationDTO;
import com.skillsphere.model.Notification;
import com.skillsphere.model.User;
import com.skillsphere.repository.NotificationRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void create(User user, String title, String message, String type) {

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRead(false);

        notificationRepository.save(notification);
    }

    @Override
    public List<NotificationDTO> getMyNotifications(Authentication authentication) {

        String email = authentication.getName();

        return notificationRepository
                .findByUser_EmailOrderByCreatedAtDesc(email)
                .stream()
                .map(NotificationDTO::new)
                .toList();
    }

    @Override
    public NotificationDTO markAsRead(Long id, Authentication authentication) {

        String email = authentication.getName();

        Notification notification = notificationRepository
                .findByIdAndUser_Email(id, email)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setRead(true);

        notificationRepository.save(notification);

        return new NotificationDTO(notification);
    }

    @Override
    public void markAllAsRead(Authentication authentication) {

        String email = authentication.getName();

        List<Notification> notifications =
                notificationRepository.findByUser_EmailAndReadFalse(email);

        notifications.forEach(n -> n.setRead(true));

        notificationRepository.saveAll(notifications);
    }
}