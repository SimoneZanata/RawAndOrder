package com.thenetvalue.usersManagement.controller;


import com.thenetvalue.usersManagement.model.Review;
import com.thenetvalue.usersManagement.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<Review>> getReviews(@PathVariable("userId") int userId) {
            return ResponseEntity.status(HttpStatus.OK)
                                 .body(this.reviewService.getReviewsFromUser(userId));
    }
    @GetMapping("/users/{userId}/movies/{movieId}")
    public ResponseEntity<Review> getReview(@PathVariable("userId") int userId,
                                            @PathVariable("movieId") int movieId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.reviewService.getReviewFromUser(movieId, userId));
    }
    @GetMapping("/users/{userId}/movies/{movieId}/existsReview")
    public ResponseEntity<Boolean> checkReview(@PathVariable("userId") int userId,@PathVariable("movieId")int movieId) {
        return ResponseEntity.status(HttpStatus.OK)
                             .body(this.reviewService.existsReviewByMovieIdAndUserId(movieId,userId));
    }
    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
            return ResponseEntity.status(HttpStatus.CREATED)
                                 .body(this.reviewService.addReview(review));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable("id") int id,@RequestBody Review review){
            return ResponseEntity.status(HttpStatus.OK)
                                 .body(this.reviewService.updateReview (id,review));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> removeReview(@PathVariable("id") int id) {
        this.reviewService.removeReview(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
