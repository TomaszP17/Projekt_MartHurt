package com.example.restapi.repository;

import com.example.restapi.entity.products.Lighting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LightingRepository extends JpaRepository<Lighting, String> {



}
