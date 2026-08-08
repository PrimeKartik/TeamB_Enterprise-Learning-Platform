package com.skillsphere.model;

import jakarta.persistence.*;

@Entity
@Table(name = "instructors")
public class Instructor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(length = 150)
    private String title = "Senior Instructor";

    @Column(length = 1000)
    private String bio = "";

    @Column(name = "avatar_url", length = 1000)
    private String avatarUrl = "";

    @Column(length = 50)
    private String rating = "4.9";

    public Instructor() {}

    public Instructor(String name, String email, String title, String bio) {
        this.name = name;
        this.email = email;
        this.title = title;
        this.bio = bio;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getRating() { return rating; }
    public void setRating(String rating) { this.rating = rating; }
}
