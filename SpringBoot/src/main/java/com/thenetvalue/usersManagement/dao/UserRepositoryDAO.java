package com.thenetvalue.usersManagement.dao;


import com.thenetvalue.usersManagement.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("dbUserDAO")
public interface UserRepositoryDAO extends CrudRepository<User, Integer> {

    public boolean existsByUsername(String name);

    public User findByUsername(String username);

}
