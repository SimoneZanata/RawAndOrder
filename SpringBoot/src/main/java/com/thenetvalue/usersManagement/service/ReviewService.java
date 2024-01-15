package com.thenetvalue.usersManagement.service;

import com.thenetvalue.usersManagement.dao.ReviewRepositoryDAO;
import com.thenetvalue.usersManagement.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;


@Service
public class ReviewService {

    @Autowired
    PasswordEncoder passwordEncoder;

    ReviewRepositoryDAO reviewDAO;

    public ReviewService(@Qualifier("dbReviewDAO") ReviewRepositoryDAO reviewDAO) {this.reviewDAO = reviewDAO;}


    public List<Review> getReviewsFromUser(int usedId) {
        return reviewDAO.findByUserId(usedId);
    }

    public Review getReviewFromUser(int movieid, int userId) throws NoSuchElementException{
        Review review = reviewDAO.findByMovieIdAndUserId(movieid,userId);
        if(!review.toString().isEmpty()){
            return review;
        }
         else throw new NoSuchElementException("Review not found");
    }

    public boolean existsReviewByMovieIdAndUserId(int movieid,int userId) throws NoSuchElementException{
System.out.println(movieid);
        return reviewDAO.existsByMovieIdAndUserId(movieid, userId);
    }


    public Review addReview(Review review) throws IllegalArgumentException{
        if(!review.toString().isEmpty()){
            if(!reviewDAO.existsByMovieIdAndUserId(review.getMovieId(), review.getUserId())){
                reviewDAO.save(review);
            } else throw new DuplicateKeyException("The movie had been already reviewed");
        }else throw new IllegalArgumentException("Invalid review received");
        return review;
    }

    public Review updateReview(int id, Review reviewUpdated) throws NoSuchElementException{
      Objects.requireNonNull(reviewUpdated.getTextComment());
        if (reviewUpdated.getRatingStars()>0) {
            Review review = reviewDAO.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("Review not found with id: " + id));
            review.setTextComment(reviewUpdated.getTextComment());
            review.setRatingStars(reviewUpdated.getRatingStars());
            reviewDAO.save(review);
            return review;
        }
        throw new IllegalArgumentException("Invalid rating data received");
    }

    public void removeReview(int id) throws NoSuchElementException{
        Review review = reviewDAO.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Review not found with id: " + id));
        reviewDAO.delete(review);
    }
}
