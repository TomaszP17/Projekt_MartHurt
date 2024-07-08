package com.example.restapi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "lighting_category")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LightingCategory {

    @Column(name = "id")
    @Id
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "lightingCategory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Lighting> lightings;
}
