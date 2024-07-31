package com.example.restapi.repository;

import com.example.restapi.entity.Pricing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PricingRepository extends JpaRepository<Pricing, Integer> {
}
