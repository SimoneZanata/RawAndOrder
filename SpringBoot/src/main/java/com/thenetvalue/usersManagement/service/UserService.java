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

import static com.thenetvalue.usersManagement.security.constants.ExceptionMessagesConstants.*;

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
        User user = userDAO.findById(id).orElseThrow(() -> new NoSuchElementException(ERROR_USER_NOT_FOUND));
            user.setPoints(user.getPoints() + userDTO.getPoints());
            userDAO.save(user);
            return UserUtil.elaborateForResponse(user);
    }

    public UserDTO updatePasswordAndEmail(int id, UpdateDTO updateDTO) throws NoSuchElementException,
                                                                              IllegalArgumentException {
        Objects.requireNonNull(updateDTO.getPassword(), ERROR_NULL_PASSWORD);
        Objects.requireNonNull(updateDTO.getEmail(), ERROR_NULL_EMAIL);

        User user = userDAO.findById(id).orElseThrow(() -> new NoSuchElementException(ERROR_USER_NOT_FOUND));
        if (UserUtil.isValidPassword(updateDTO.getPassword())) {
            user.setPassword(passwordEncoder.encode(updateDTO.getPassword()));
        } else {
            throw new IllegalArgumentException(ERROR_FAULTY_PASSWORD);
        }
        if (UserUtil.isValidEmail(updateDTO.getEmail())) {
            user.setEmail(updateDTO.getEmail());
        } else {
            throw new IllegalArgumentException(ERROR_FAULTY_EMAIL);
        }
        userDAO.save(user);
        return UserUtil.elaborateForResponse(user);
    }
}



