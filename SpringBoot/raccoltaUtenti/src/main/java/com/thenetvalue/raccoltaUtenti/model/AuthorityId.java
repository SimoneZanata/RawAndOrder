package com.thenetvalue.raccoltaUtenti.model;

import java.io.Serializable;

public class AuthorityId implements Serializable {
    private String username;

    private String authority;

    public AuthorityId() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
