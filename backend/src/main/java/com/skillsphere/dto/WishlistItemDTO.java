package com.skillsphere.dto;

import com.skillsphere.model.Wishlist;
import java.time.LocalDateTime;

public class WishlistItemDTO {

    private Long courseId;
    private String courseTitle;
    private String imageUrl;
    private Double price;
    private String level;
    private LocalDateTime savedAt;

    public WishlistItemDTO(Wishlist w) {
        this.courseId = w.getCourse().getId();
        this.courseTitle = w.getCourse().getTitle();
        this.imageUrl = w.getCourse().getImageUrl();
        this.price = w.getCourse().getPrice();
        this.level = w.getCourse().getLevel();
        this.savedAt = w.getSavedAt();
    }

    public Long getCourseId() { return courseId; }
    public String getCourseTitle() { return courseTitle; }
    public String getImageUrl() { return imageUrl; }
    public Double getPrice() { return price; }
    public String getLevel() { return level; }
    public LocalDateTime getSavedAt() { return savedAt; }
}
