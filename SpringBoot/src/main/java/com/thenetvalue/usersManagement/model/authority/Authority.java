package com.thenetvalue.usersManagement.model.authority;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thenetvalue.usersManagement.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Setter
@Getter
@Entity
@Table(name = "authorities")
@IdClass(AuthorityId.class) //composite keys
public class Authority{
    @Id
    private String username;
    @Id
    private String authority;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "username", referencedColumnName = "username", insertable = false, updatable =false,  nullable = false)
    private User user;

    public Authority(){}
@Autowired
    public Authority(String username, String authority) {
        this.username = username;
        this.authority = authority;
    }
}
