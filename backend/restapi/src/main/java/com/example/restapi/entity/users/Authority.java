package com.example.restapi.entity.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "authority")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Authority {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "authority", length = 50, nullable = false)
    private String authority;

    @OneToMany(mappedBy = "authority", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private Set<MyUserAuthority> userAuthorities;

    public String getAuthorityName() {
        return authority;
    }
}
