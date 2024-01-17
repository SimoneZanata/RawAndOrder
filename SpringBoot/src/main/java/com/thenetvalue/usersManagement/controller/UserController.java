package com.thenetvalue.usersManagement.controller;
import com.thenetvalue.usersManagement.model.DTOs.UpdateDTO;
import com.thenetvalue.usersManagement.model.DTOs.UserDTO;
import com.thenetvalue.usersManagement.model.Player;
import com.thenetvalue.usersManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;



@RestController
@RequestMapping("/users")
public class UserController {


    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/{id}/points")
    public ResponseEntity<UserDTO> updatePoints(@PathVariable("id") int userId, @RequestBody UserDTO userDTO) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(userService.updatePointsUser(userId, userDTO));
    }

    @GetMapping
    public ResponseEntity<List<Player>> allUsers() {
           return ResponseEntity.status(HttpStatus.OK)
                                .body(userService.allUsers());
}
    @PutMapping("/{id}/profile")
    public ResponseEntity<UserDTO> updatePasswordAndEmail(@PathVariable("id") int id, @RequestBody UpdateDTO updateDTO) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(userService.updatePasswordAndEmail(id, updateDTO));
    }
}
