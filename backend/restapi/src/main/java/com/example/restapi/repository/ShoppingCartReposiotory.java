package com.example.restapi.repository;

import com.example.restapi.entity.products.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ShoppingCartReposiotory extends JpaRepository<ShoppingCart, Integer> {

    @Query("SELECT sc FROM ShoppingCart sc WHERE sc.employee.myuserId = :userId")
    Optional<ShoppingCart> findByEmployeeMyuserId(int userId);
}
