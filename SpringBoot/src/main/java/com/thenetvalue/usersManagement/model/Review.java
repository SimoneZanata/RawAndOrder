package com.thenetvalue.usersManagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "reviewSequence")
    @SequenceGenerator(name = "reviewSequence", sequenceName = "reviews_seq", allocationSize = 1)
    private int id;

    private int userId;

    private int movieId;

    private int ratingStars;

    private String textComment;

    private String movieTitle;

    private String movieImg;

    private String movieBackground;

    @Column(length = 1000)
    private String movieDescription;

    private String movieLanguage;

    private String movieReleaseDate;

    private float movieVoteAverage;
    @CreationTimestamp
    @Column(name = "timestamp", nullable = false, updatable = false)
    private LocalDateTime timestamp = LocalDateTime.now();
}
