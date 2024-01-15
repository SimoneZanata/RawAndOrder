package com.thenetvalue.usersManagement.model.authority;

import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
@Setter
@Getter
public class AuthorityId implements Serializable {
    private String username;

    private String authority;

    public AuthorityId() {
    }
}
