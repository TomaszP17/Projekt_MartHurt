package com.example.restapi.repository;

import com.example.restapi.entity.products.Lighting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LightingRepository extends JpaRepository<Lighting, String> {

    @Query("SELECT l FROM Lighting l JOIN FETCH l.product p LEFT JOIN FETCH p.images")
    List<Lighting> findAllWithProductsAndImages();

    @Query("SELECT l FROM Lighting l JOIN l.product p ORDER BY p.dateAdded DESC")
    Page<Lighting> findTopByOrderByProductDateAddedDesc(Pageable pageable);

    @Query("SELECT l FROM Lighting l WHERE l.productId IN :productIds")
    List<Lighting> findByProductIds(@Param("productIds") List<String> productIds);

    @Query("SELECT l FROM Lighting l JOIN l.product p WHERE p.productMarkings.id = 2")
    List<Lighting> findLastProducts();
}
