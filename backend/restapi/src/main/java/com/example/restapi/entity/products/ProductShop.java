package com.example.restapi.entity.products;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_shop")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductShop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "shop_id", referencedColumnName = "id", nullable = false)
    private Shop shop;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private Product product;
}
