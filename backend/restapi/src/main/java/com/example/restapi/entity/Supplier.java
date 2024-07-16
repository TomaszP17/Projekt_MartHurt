package com.example.restapi.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "supplier")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Supplier {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Product> products;
}
