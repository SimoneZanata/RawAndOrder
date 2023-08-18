package com.thenetvalue.raccoltaUtenti.model.response;

import com.thenetvalue.raccoltaUtenti.model.User;

import java.util.ArrayList;
import java.util.List;

public class ResponseUser {
    private int id;
    private String email;
    private String username;
    private int points;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

}
