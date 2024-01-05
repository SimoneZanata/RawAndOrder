package com.thenetvalue.usersManagement.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thenetvalue.usersManagement.model.authority.Authority;
import com.thenetvalue.usersManagement.model.DTOs.UserDTO;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "userSequence")
    @SequenceGenerator(name = "userSequence", sequenceName = "users_seq", allocationSize = 1)
    private int id;
    private String username;
    private String password;
    private String email;
    private boolean enabled;
    private int points;
    @JsonIgnore
    @OneToMany(mappedBy="user", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Authority> authorities;

    public User() {
        this.authorities=new HashSet<>();
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public void setAuthoritiesUser() {
        Authority authority = new Authority();
        authority.setAuthority("ROLE_USER");
        authority.setUsername(this.getUsername());
        this.getAuthorities().add(authority);
    }

    public UserDTO elaborateForResponse(){
        UserDTO userDTO =new UserDTO();
        userDTO.setId(this.getId());
        userDTO.setUsername(this.getUsername());
        userDTO.setEmail(this.getEmail());
        userDTO.setPoints(this.getPoints());
        return userDTO;
    }

    public static List<UserDTO> ElaborateListForResponse(Iterable <User> users){
        List<UserDTO> userDTOS =new ArrayList<>();
        for(User user: users){
            userDTOS.add(user.elaborateForResponse());
        }
        return userDTOS;
    }
}
