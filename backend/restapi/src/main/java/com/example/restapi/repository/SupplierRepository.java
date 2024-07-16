package com.example.restapi.repository;

import com.example.restapi.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
}
