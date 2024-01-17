package com.thenetvalue.usersManagement.controller;
import com.thenetvalue.usersManagement.model.DTOs.RegisterDTO;
import com.thenetvalue.usersManagement.model.DTOs.UserDTO;
import com.thenetvalue.usersManagement.service.AccountService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
public class AccountController {
    private AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> addUser(@RequestBody RegisterDTO user) {
            accountService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/logout")
    public ResponseEntity<HttpStatus> logout(HttpServletResponse response, HttpServletRequest request) {
        this.accountService.logout(response, request);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(Authentication authentication) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(accountService.logIn(authentication));
    }
}
