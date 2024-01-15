package com.thenetvalue.usersManagement.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thenetvalue.usersManagement.model.authority.Authority;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "users")
public class User {

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
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Authority> authorities =new HashSet<>();


    public void setAuthoritiesUser() {
        Authority authority = new Authority();
        authority.setAuthority("ROLE_USER");
        authority.setUsername(this.getUsername());
        this.getAuthorities().add(authority);
    }
}
