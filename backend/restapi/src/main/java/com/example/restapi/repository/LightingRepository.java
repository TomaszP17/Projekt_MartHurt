package com.example.restapi.repository;

import com.example.restapi.entity.products.Lighting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LightingRepository extends JpaRepository<Lighting, String> {
    @Query("SELECT l FROM Lighting l JOIN l.product p ORDER BY p.dateAdded DESC")
    Page<Lighting> findTopByOrderByProductDateAddedDesc(Pageable pageable);
}
