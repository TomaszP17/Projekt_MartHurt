package com.example.restapi.entity.users;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "client")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Client {

    @Id
    @Column(name = "myuser_id")
    private int myuserId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "myuser_id")
    private MyUser myuser;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "phone", nullable = false)
    private String phone;
}
