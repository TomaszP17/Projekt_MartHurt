package com.example.restapi.entity.products;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lighting")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Lighting {

    @Id
    @Column(name = "product_id")
    private String productId;

    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Product product;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "size", nullable = false)
    private String size;

    @Column(name = "lighting", nullable = false)
    private String lighting;

    @Column(name = "lumens", nullable = false)
    private String lumens;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "finish", nullable = false)
    private String finish;
}
