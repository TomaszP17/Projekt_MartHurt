package com.example.restapi.entity.products;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_shopping_cart")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "shopping_cart_id", referencedColumnName = "id", nullable = false)
    private ShoppingCart shoppingCart;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private Product product;
}
