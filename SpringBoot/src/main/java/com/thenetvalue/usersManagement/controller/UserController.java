package com.thenetvalue.usersManagement.controller;
import com.thenetvalue.usersManagement.model.User;
import com.thenetvalue.usersManagement.model.DTOs.RegisterDTO;
import com.thenetvalue.usersManagement.model.DTOs.UpdateDTO;
import com.thenetvalue.usersManagement.model.DTOs.UserDTO;
import com.thenetvalue.usersManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.thenetvalue.usersManagement.security.constants.ApplicationConstants.SUCCESS_MSG;


@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/{userId}/updatePoints")
    public ResponseEntity<?> updatePoints(@PathVariable("userId") int userId, @RequestBody UserDTO userDTO) {
        try {
            userService.updatePointsUser(userId,userDTO);
            return ResponseEntity.ok(userService.updatePointsUser(userId,userDTO));
        } catch (DataAccessException e) {
            return ResponseEntity.internalServerError().body("Failed to update points due to a database error");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> addUser(@RequestBody RegisterDTO user) {
            try {
                userService.registerUser(user);
                return ResponseEntity.ok(Map.of("message",SUCCESS_MSG));
            }catch (IllegalArgumentException e){
                return ResponseEntity.badRequest().body("Error: "+ e.getMessage());
            }
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(Authentication authentication) {
        return ResponseEntity.ok(userService.logIn(authentication));
}

    @GetMapping("users/{id}")
    public Optional<User> getUserById(@PathVariable("id") int id) {
        return userService.getUser(id);
    }

    @GetMapping("/all")
    public List<UserDTO> allUsers(){
        return userService.allUsers();
    }

    @DeleteMapping("users/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        return userService.deleteUser(id);
    }

    @PutMapping("/{id}/updateProfile")
    public UserDTO updatePasswordAndEmail(@PathVariable("id") int id, @RequestBody UpdateDTO updateDTO) {
        return userService.updatePasswordAndEmail(id, updateDTO);
    }
}
