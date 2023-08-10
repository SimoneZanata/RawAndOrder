package com.thenetvalue.raccoltaUtenti.dao;

import com.thenetvalue.raccoltaUtenti.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("dbUserDAO")
public interface UserRepositoryDAO extends CrudRepository<User, Integer> {
    public List<User> findByUsernameContains(String partialUsername);

    public List<User> findByUsernameContainsAndEmailContains(String partialUsername, String partialMail);

    public boolean existsByUsername(String name);

    public User findByUsername(String username);


}
