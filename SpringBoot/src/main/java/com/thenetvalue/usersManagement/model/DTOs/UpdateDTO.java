package com.thenetvalue.usersManagement.model.DTOs;


public class UpdateDTO {
    private String email;
    private String password;

    public UpdateDTO() {
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
}
