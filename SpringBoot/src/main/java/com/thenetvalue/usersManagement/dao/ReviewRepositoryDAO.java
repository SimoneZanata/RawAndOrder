package com.thenetvalue.usersManagement.dao;

import com.thenetvalue.usersManagement.model.Review;
import com.thenetvalue.usersManagement.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("dbReviewDAO")
public interface ReviewRepositoryDAO extends CrudRepository<Review, Integer> {

    public boolean existsByMovieIdAndUserId(int movieId, int userId);

    public List<Review> findByUserId(int userId);

    public Review findByMovieIdAndUserId(int movieId,int userId);
}
