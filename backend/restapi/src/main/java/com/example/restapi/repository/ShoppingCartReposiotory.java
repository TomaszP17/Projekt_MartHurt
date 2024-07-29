package com.example.restapi.repository;

import com.example.restapi.entity.products.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ShoppingCartReposiotory extends JpaRepository<ShoppingCart, Integer> {

    @Query("SELECT sc FROM ShoppingCart sc " +
            "LEFT JOIN FETCH sc.productShoppingCarts psc " +
            "LEFT JOIN FETCH psc.product p " +
            "LEFT JOIN FETCH p.images i " +
            "WHERE sc.id = :shoppingCartId")
    ShoppingCart findShoppingCartWithProducts(@Param("shoppingCartId") int shoppingCartId);
}
