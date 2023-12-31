package com.thenetvalue.usersManagement.model.DTOs;


import com.thenetvalue.usersManagement.model.User;

public class RegisterDTO {
    private String username;
    private String email;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User elaborateForDB(){
        User user=new User();
        user.setPassword(this.password);
        user.setUsername(this.username);
        user.setEmail(this.email);
        user.setEnabled(true);
        user.setAuthoritiesUser();
        return user;
    }
}
