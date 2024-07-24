package com.example.restapi.entity.users;

import com.example.restapi.enums.RoleType;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "authority")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString
public class Authority {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name", nullable = false)
    private RoleType name;

    @OneToMany(mappedBy = "authority", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private Set<MyUserAuthority> userAuthorities;

    /*public String getAuthorityName() {
        return authority;
    }*/
}
