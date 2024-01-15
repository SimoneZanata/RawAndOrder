package com.thenetvalue.usersManagement.service;

import com.thenetvalue.usersManagement.dao.UserRepositoryDAO;
import com.thenetvalue.usersManagement.model.Player;
import com.thenetvalue.usersManagement.model.User;
import com.thenetvalue.usersManagement.model.DTOs.UpdateDTO;
import com.thenetvalue.usersManagement.model.DTOs.UserDTO;
import com.thenetvalue.usersManagement.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    UserRepositoryDAO userDAO;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(@Qualifier("dbUserDAO") UserRepositoryDAO userDAO) {
        this.userDAO = userDAO;
    }

    public List<Player> allUsers(){
     return UserUtil.ElaboratePlayersForResponse(userDAO.findAll());
    }

    public UserDTO updatePointsUser(int id, UserDTO userDTO) throws NoSuchElementException{
        User user = userDAO.findById(id).orElseThrow(() -> new NoSuchElementException("User not found"));
            user.setPoints(user.getPoints() + userDTO.getPoints());
            userDAO.save(user);
            return UserUtil.elaborateForResponse(user);
    }

    public UserDTO updatePasswordAndEmail(int id, UpdateDTO updateDTO) throws NoSuchElementException,
                                                                              IllegalArgumentException {
        Objects.requireNonNull(updateDTO.getPassword(), "Password is null");
        Objects.requireNonNull(updateDTO.getEmail(), "Email is null");

        User user = userDAO.findById(id).orElseThrow(() -> new NoSuchElementException("User not found"));
        if (UserUtil.isValidPassword(updateDTO.getPassword())) {
            user.setPassword(passwordEncoder.encode(updateDTO.getPassword()));
        } else {
            throw new IllegalArgumentException("Invalid password. Ensure that it meets the security requirements");
        }
        if (UserUtil.isValidEmail(updateDTO.getEmail())) {
            user.setEmail(updateDTO.getEmail());
        } else {
            throw new IllegalArgumentException("Invalid email. Ensure that it meets the security requirements");
        }
        userDAO.save(user);
        return UserUtil.elaborateForResponse(user);
    }
}



