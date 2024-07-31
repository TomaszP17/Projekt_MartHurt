package com.example.restapi.repository;

import com.example.restapi.dto.response.lighting.LightingFromShoppingCartResponseDTO;
import com.example.restapi.entity.Pricing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PricingRepository extends JpaRepository<Pricing, Integer> {

    @Query("SELECT new com.example.restapi.dto.response.lighting.LightingFromShoppingCartResponseDTO(" +
            "p.productOriginalName, " +
            "i.url, " +
            "p.description, " +
            "p.nettoClientBuyPrice, " +
            "p.bruttoClientBuyPrice, " +
            "0.0, " +
            "0.0) " +
            "FROM ShoppingCart sc " +
            "JOIN sc.productShoppingCarts psc " +
            "JOIN psc.product p " +
            "JOIN p.lighting l " +
            "LEFT JOIN p.images i " +
            "WHERE sc.id = :shoppingCartId " +
            "GROUP BY p.productOriginalName, i.url, p.description, p.nettoClientBuyPrice, p.bruttoClientBuyPrice")
    List<LightingFromShoppingCartResponseDTO> findLightingsByShoppingCartId(@Param("shoppingCartId") int shoppingCartId);
}
