package com.thenetvalue.usersManagement.model.DTOs;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO {
    private int id;
    private String email;
    private String username;
    private int points;
}
