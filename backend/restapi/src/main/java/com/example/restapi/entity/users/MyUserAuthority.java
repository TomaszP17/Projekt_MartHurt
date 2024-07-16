package com.example.restapi.entity.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users_authorities")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class MyUserAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private MyUser user;

    @ManyToOne
    @JoinColumn(name = "authority_id", nullable = false)
    private Authority authority;

    public MyUserAuthority(MyUser user, Authority authority) {
        this.user = user;
        this.authority = authority;
    }
}
