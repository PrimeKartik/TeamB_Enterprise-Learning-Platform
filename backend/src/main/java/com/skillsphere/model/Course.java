package com.skillsphere.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;



@Entity
@Table(name = "courses")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Course {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;




    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;





    @Column(length = 2000)
    private String description = "";





    private String badge = "";



    @Column(name = "badge_color")
    private String badgeColor = "";





    @NotBlank(message = "Level is required")
    @Column(nullable = false)
    private String level;





    private String duration = "";





    @DecimalMin(value = "0.0")
    @DecimalMax(value = "5.0")
    private Double rating = 0.0;





    private String reviews = "0";





    @PositiveOrZero(message = "Price cannot be negative")
    private Double price = 0.0;





    @Column(name = "image_url", length = 2000)
    private String imageUrl = "";





    @NotBlank(message = "Skill is required")
    @Column(nullable = false)
    private String skill;





    @PositiveOrZero
    @Column(name = "total_lessons")
    private Integer totalLessons = 0;





    @PositiveOrZero
    @Column(name = "total_hours")
    private Integer totalHours = 0;





    @PositiveOrZero
    @Column(name = "total_quizzes")
    private Integer totalQuizzes = 0;





    @Column(length = 2000)
    private String prerequisites = "";





    @Column(length = 2000)
    private String learningOutcomes = "";

    @Column(name = "instructor", length = 255)
    private String instructor = "Dr. Alex Morgan";







    public Course(){}







    public Long getId(){
        return id;
    }


    public void setId(Long id){
        this.id=id;
    }





    public String getTitle(){
        return title;
    }


    public void setTitle(String title){
        this.title=title;
    }






    public String getDescription(){
        return description;
    }


    public void setDescription(String description){
        this.description=description;
    }






    public String getBadge(){
        return badge;
    }


    public void setBadge(String badge){
        this.badge=badge;
    }






    public String getBadgeColor(){
        return badgeColor;
    }


    public void setBadgeColor(String badgeColor){
        this.badgeColor=badgeColor;
    }






    public String getLevel(){
        return level;
    }


    public void setLevel(String level){
        this.level=level;
    }






    public String getDuration(){
        return duration;
    }


    public void setDuration(String duration){
        this.duration=duration;
    }






    public Double getRating(){
        return rating;
    }


    public void setRating(Double rating){
        this.rating=rating;
    }


    public String getReviews(){
        return reviews;
    }


    public void setReviews(String reviews){
        this.reviews=reviews;
    }






    public Double getPrice(){
        return price;
    }


    public void setPrice(Double price){
        this.price=price;
    }






    public String getImageUrl(){
        return imageUrl;
    }


    public void setImageUrl(String imageUrl){
        this.imageUrl=imageUrl;
    }






    public String getSkill(){
        return skill;
    }


    public void setSkill(String skill){
        this.skill=skill;
    }






    public Integer getTotalLessons(){
        return totalLessons;
    }


    public void setTotalLessons(Integer totalLessons){
        this.totalLessons=totalLessons;
    }






    public Integer getTotalHours(){
        return totalHours;
    }


    public void setTotalHours(Integer totalHours){
        this.totalHours=totalHours;
    }






    public Integer getTotalQuizzes(){
        return totalQuizzes;
    }


    public void setTotalQuizzes(Integer totalQuizzes){
        this.totalQuizzes=totalQuizzes;
    }






    public String getPrerequisites(){
        return prerequisites;
    }


    public void setPrerequisites(String prerequisites){
        this.prerequisites=prerequisites;
    }






    public String getLearningOutcomes(){
        return learningOutcomes;
    }


    public void setLearningOutcomes(String learningOutcomes){
        this.learningOutcomes=learningOutcomes;
    }

    public String getInstructor(){
        return instructor;
    }

    public void setInstructor(String instructor){
        this.instructor=instructor;
    }



}