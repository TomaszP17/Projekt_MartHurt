package com.example.restapi.repository;

import com.example.restapi.entity.products.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String> {


}
