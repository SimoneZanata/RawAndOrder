package com.thenetvalue.usersManagement.model.DTOs;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterDTO {

    private String username;
    private String email;
    private String password;

    public RegisterDTO() {
    }
}
