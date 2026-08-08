package com.skillsphere.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "coding_badges")
public class CodingBadge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "badge_key", nullable = false)
    private String badgeKey;

    @Column(name = "badge_title", nullable = false)
    private String badgeTitle;

    @Column(name = "badge_description", nullable = false)
    private String badgeDescription;

    @Column(name = "icon_name")
    private String iconName = "Award";

    @Column(name = "unlocked_at")
    private LocalDateTime unlockedAt = LocalDateTime.now();

    public CodingBadge() {}

    public CodingBadge(String userEmail, String badgeKey, String badgeTitle, String badgeDescription, String iconName) {
        this.userEmail = userEmail;
        this.badgeKey = badgeKey;
        this.badgeTitle = badgeTitle;
        this.badgeDescription = badgeDescription;
        this.iconName = iconName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getBadgeKey() { return badgeKey; }
    public void setBadgeKey(String badgeKey) { this.badgeKey = badgeKey; }

    public String getBadgeTitle() { return badgeTitle; }
    public void setBadgeTitle(String badgeTitle) { this.badgeTitle = badgeTitle; }

    public String getBadgeDescription() { return badgeDescription; }
    public void setBadgeDescription(String badgeDescription) { this.badgeDescription = badgeDescription; }

    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }

    public LocalDateTime getUnlockedAt() { return unlockedAt; }
    public void setUnlockedAt(LocalDateTime unlockedAt) { this.unlockedAt = unlockedAt; }
}
