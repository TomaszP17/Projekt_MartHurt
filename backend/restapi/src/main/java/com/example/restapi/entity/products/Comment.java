package com.example.restapi.entity.products;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "comment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "message", nullable = false)
    private String message;
}
