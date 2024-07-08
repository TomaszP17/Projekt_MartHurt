package com.example.restapi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "product")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Product {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "catalog_price", precision = 7, scale = 2)
    private BigDecimal catalogPrice;

    @Column(name = "purchase_price", precision = 7, scale = 2) // Decimal(7,2)
    private BigDecimal purchasePrice;

    @Column(name = "margin")
    private BigDecimal margin;

    @Column(name = "image")
    private String image;

    @Column(name = "retail_price", precision = 7, scale = 2)
    private BigDecimal retailPrice;

    @Column(name = "specification")
    private String specification;

    @Column(name = "deleted")
    private boolean deleted;

    @OneToOne(mappedBy = "product")
    private Lighting lighting;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

}
