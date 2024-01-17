package com.thenetvalue.usersManagement.model.DTOs;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateDTO {
    private String email;
    private String password;

    public UpdateDTO() {
    }
}
