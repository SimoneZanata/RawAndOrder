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

import static com.thenetvalue.usersManagement.security.constants.ExceptionMessagesConstants.*;


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
         else throw new NoSuchElementException(ERROR_REVIEW_NOT_FOUND);
    }

    public boolean existsReviewByMovieIdAndUserId(int movieid,int userId) throws NoSuchElementException{
        return reviewDAO.existsByMovieIdAndUserId(movieid, userId);
    }


    public Review addReview(Review review) throws IllegalArgumentException,
                                                  NullPointerException,
                                                  DuplicateKeyException {

        Objects.requireNonNull(review.getTextComment(),ERROR_NULL_REVIEW_TEXT);

        if ((review.getRatingStars() > 0 && review.getRatingStars() <= 5) || !review.getTextComment().isEmpty()) {
            if (!reviewDAO.existsByMovieIdAndUserId(review.getMovieId(), review.getUserId())) {
                reviewDAO.save(review);
                return review;
            } else throw new DuplicateKeyException(ERROR_REVIEW_DUPLICATED);
        } else throw new IllegalArgumentException(ERROR_INVALID_REVIEW);
    }

    public Review updateReview(int id, Review reviewUpdated) throws NoSuchElementException,
                                                                    NullPointerException{

      Objects.requireNonNull(reviewUpdated.getTextComment(),ERROR_NULL_REVIEW_TEXT);

        if ((reviewUpdated.getRatingStars() > 0 && reviewUpdated.getRatingStars() <= 5) ||
                !reviewUpdated.getTextComment().isEmpty()) {
            Review review = reviewDAO.findById(id)
                    .orElseThrow(() -> new NoSuchElementException(ERROR_REVIEW_NOT_FOUND));
            review.setTextComment(reviewUpdated.getTextComment());
            review.setRatingStars(reviewUpdated.getRatingStars());
            reviewDAO.save(review);
            return review;
        }
       else throw new IllegalArgumentException(ERROR_INVALID_REVIEW);
    }

    public void removeReview(int id) throws NoSuchElementException{
        Review review = reviewDAO.findById(id)
                .orElseThrow(() -> new NoSuchElementException(ERROR_REVIEW_NOT_FOUND));
        reviewDAO.delete(review);
    }
}
