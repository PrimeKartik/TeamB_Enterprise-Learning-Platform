package com.skillsphere.dto;

import com.skillsphere.model.Notification;
import java.time.LocalDateTime;

public class NotificationDTO {

    private Long id;
    private String title;
    private String message;
    private String type;
    private Boolean read;
    private LocalDateTime createdAt;

    public NotificationDTO() {
    }

    public NotificationDTO(Notification n) {
        this.id = n.getId();
        this.title = n.getTitle();
        this.message = n.getMessage();
        this.type = n.getType();
        this.read = n.getRead();
        this.createdAt = n.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public String getType() {
        return type;
    }

    public Boolean getRead() {
        return read;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
