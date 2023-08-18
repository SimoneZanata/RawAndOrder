package com.thenetvalue.raccoltaUtenti.controller;

import com.thenetvalue.raccoltaUtenti.model.request.LoginUser;
import com.thenetvalue.raccoltaUtenti.model.request.RegisterUser;
import com.thenetvalue.raccoltaUtenti.model.response.ResponseUser;
import com.thenetvalue.raccoltaUtenti.model.request.UpdateUser;
import com.thenetvalue.raccoltaUtenti.model.User;
import com.thenetvalue.raccoltaUtenti.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200/")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/rankings/{id}")
    public ResponseUser updatePointsUser(@PathVariable("id") int id, @RequestBody int points) {
        return userService.updatePointsUser(id, points);
    }

    @PostMapping("/register")
    public ResponseUser addUser(@RequestBody RegisterUser user) {
            return userService.registerUser(user);
    }


    @PostMapping("/login")
    public ResponseUser loginUser(@RequestBody LoginUser user) {
        return  userService.logIn(user);
    }

    @GetMapping("users/{id}")
    public Optional<User> getUserById(@PathVariable("id") int id) {
        return userService.getUser(id);
    }

    @GetMapping("users/search/username/{partialUsername}")
    public List<User> searchUserByUsername(@PathVariable("partialUsername") String partialUsername) {
        return userService.searchUserByUsername(partialUsername);
    }

    @GetMapping("users/search/username/{partialUsername}/mail/{partialMail}")
    public List<User> searchUserByUsername(@PathVariable("partialUsername") String partialUsername,
                                           @PathVariable("partialMail") String partialMail) {
        return userService.searchUserByUsernameAndEmail(partialUsername, partialMail);
    }

    @GetMapping("/all")
    public List<ResponseUser> allUsers(){
        return userService.allUsers();
    }

    @DeleteMapping("users/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        return userService.deleteUser(id);
    }

    @PutMapping("/{id}")
    public ResponseUser updatePasswordAndEmail(@PathVariable("id") int id, @RequestBody UpdateUser updateUser) {
        return userService.updatePasswordAndEmail(id, updateUser);
    }
}
