package com.example.restapi.entity.users;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employee")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    @Id
    @Column(name = "myuser_id")
    private int myuserId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "myuser_id")
    private MyUser myuser;
}