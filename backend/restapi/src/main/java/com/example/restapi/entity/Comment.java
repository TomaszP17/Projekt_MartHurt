package com.example.restapi.entity;

import com.example.restapi.entity.products.Product;
import com.example.restapi.entity.users.Employee;
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

    @Column(name = "message", nullable = false, length = 255)
    private String message;

    @ManyToOne
    @JoinColumn(name = "employee_myuser", referencedColumnName = "myuser_id", nullable = false)
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private Product product;
}
