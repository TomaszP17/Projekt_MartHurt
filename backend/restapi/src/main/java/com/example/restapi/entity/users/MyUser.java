package com.example.restapi.entity.users;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "myuser")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString
public class MyUser {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @Column(name = "password", length = 60, nullable = false)
    private String password;

    @Column(name = "enabled", nullable = false)
    private boolean enabled = true;

    @Column(name = "email", nullable = false)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private Set<MyUserAuthority> userAuthorities;

    @OneToOne(mappedBy = "myuser", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Client client;

    @OneToOne(mappedBy = "myuser", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Employee employee;

    public MyUser(String username, String password, boolean enabled) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
    }
}
