package com.thenetvalue.usersManagement.service;


import com.thenetvalue.usersManagement.dao.UserRepositoryDAO;
import com.thenetvalue.usersManagement.model.DTOs.RegisterDTO;
import com.thenetvalue.usersManagement.model.DTOs.UserDTO;
import com.thenetvalue.usersManagement.model.User;
import com.thenetvalue.usersManagement.util.UserUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Objects;

@Service
public class AccountService {
    @Autowired
    PasswordEncoder passwordEncoder;

    UserRepositoryDAO userDAO;

    public AccountService(@Qualifier("dbUserDAO") UserRepositoryDAO userDAO) {this.userDAO = userDAO;}


    public void logout(HttpServletResponse response, HttpServletRequest request){
        SecurityContextHolder.clearContext();
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        UserUtil.handleLogOutResponseCookie(response, request);
    }

    public UserDTO logIn(Authentication authentication){
        String username = authentication.getName();
        User user = userDAO.findByUsername(username);
        return UserUtil.elaborateForResponse(user);
    }

    public void registerUser(RegisterDTO registerDTO)throws IllegalArgumentException{
        Objects.requireNonNull(registerDTO.getPassword(), "Password is null");
        Objects.requireNonNull(registerDTO.getUsername(), "Username is null");
        Objects.requireNonNull(registerDTO.getEmail(), "Email is null");

        if (!userDAO.existsByUsername(registerDTO.getUsername())) {
            if(UserUtil.isValidPassword(registerDTO.getPassword())) {
                registerDTO.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
            }
            else {
                throw new IllegalArgumentException("Invalid password. Ensure that it meets the security requirements");
            }if(!UserUtil.isValidUsername(registerDTO.getUsername())) {
                throw new IllegalArgumentException("Invalid Username. Ensure that it meets the security requirements");
            }
            if(!UserUtil.isValidEmail(registerDTO.getEmail())) {
                throw new IllegalArgumentException("Invalid email. Ensure that it meets the security requirements");
            }
            userDAO.save(UserUtil.elaborateForDB(registerDTO));
        } else throw new DuplicateKeyException("Username already exist");
    }
}
