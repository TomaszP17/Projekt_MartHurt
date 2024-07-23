package com.example.restapi.repository;

import com.example.restapi.entity.products.ProductShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductShoppingCartRepository extends JpaRepository<ProductShoppingCart, Integer> {
}
