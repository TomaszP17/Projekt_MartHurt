package com.example.restapi.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "lighting")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Lighting {

    @Id
    private String productId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "product_id")
    @JsonBackReference
    private Product product;

    @ManyToOne
    @JoinColumn(name = "lighting_category_id")
    @JsonManagedReference
    private LightingCategory lightingCategory;
}
