package com.example.restapi.entity.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @JoinColumn(name = "myuser_id", referencedColumnName = "id", insertable = false, updatable = false)
    private MyUser myUser;
}
