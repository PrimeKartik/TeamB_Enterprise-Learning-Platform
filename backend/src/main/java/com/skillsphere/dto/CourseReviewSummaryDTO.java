package com.skillsphere.dto;

import com.skillsphere.model.CourseReview;
import java.util.List;

public class CourseReviewSummaryDTO {
    private double averageRating = 4.8;
    private long totalReviews = 325;
    private long star5Count = 227;
    private long star4Count = 58;
    private long star3Count = 23;
    private long star2Count = 10;
    private long star1Count = 7;

    private int star5Pct = 70;
    private int star4Pct = 18;
    private int star3Pct = 7;
    private int star2Pct = 3;
    private int star1Pct = 2;

    private List<CourseReview> reviews;

    public CourseReviewSummaryDTO() {}

    public double getAverageRating() { return averageRating; }
    public void setAverageRating(double averageRating) { this.averageRating = averageRating; }

    public long getTotalReviews() { return totalReviews; }
    public void setTotalReviews(long totalReviews) { this.totalReviews = totalReviews; }

    public long getStar5Count() { return star5Count; }
    public void setStar5Count(long star5Count) { this.star5Count = star5Count; }

    public long getStar4Count() { return star4Count; }
    public void setStar4Count(long star4Count) { this.star4Count = star4Count; }

    public long getStar3Count() { return star3Count; }
    public void setStar3Count(long star3Count) { this.star3Count = star3Count; }

    public long getStar2Count() { return star2Count; }
    public void setStar2Count(long star2Count) { this.star2Count = star2Count; }

    public long getStar1Count() { return star1Count; }
    public void setStar1Count(long star1Count) { this.star1Count = star1Count; }

    public int getStar5Pct() { return star5Pct; }
    public void setStar5Pct(int star5Pct) { this.star5Pct = star5Pct; }

    public int getStar4Pct() { return star4Pct; }
    public void setStar4Pct(int star4Pct) { this.star4Pct = star4Pct; }

    public int getStar3Pct() { return star3Pct; }
    public void setStar3Pct(int star3Pct) { this.star3Pct = star3Pct; }

    public int getStar2Pct() { return star2Pct; }
    public void setStar2Pct(int star2Pct) { this.star2Pct = star2Pct; }

    public int getStar1Pct() { return star1Pct; }
    public void setStar1Pct(int star1Pct) { this.star1Pct = star1Pct; }

    public List<CourseReview> getReviews() { return reviews; }
    public void setReviews(List<CourseReview> reviews) { this.reviews = reviews; }
}
