package com.example.restapi.entity.products;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @Column(name = "id")
    private String id;

    @ManyToOne
    @JoinColumn(name = "product_markings_id", referencedColumnName = "id", nullable = false)
    private ProductMarkings productMarkings;

    @ManyToOne
    @JoinColumn(name = "supplier_id", referencedColumnName = "id", nullable = false)
    private Supplier supplier;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @ManyToOne
    @JoinColumn(name = "product_category_id", referencedColumnName = "id", nullable = false)
    private ProductCategory productCategory;

    @Column(name = "netto_price", nullable = false)
    private BigDecimal nettoPrice;

    @Column(name = "conditions", nullable = false)
    private String conditions;

    @Column(name = "brutto_buy_price", nullable = false)
    private BigDecimal bruttoBuyPrice;

    @Column(name = "netto_buy_price", nullable = false)
    private BigDecimal nettoBuyPrice;

    @Column(name = "brutto_margin", nullable = false)
    private BigDecimal bruttoMargin;

    @Column(name = "netto_margin", nullable = false)
    private BigDecimal nettoMargin;

    @Column(name = "netto_client_buy_price", nullable = false)
    private BigDecimal nettoClientBuyPrice;

    @Column(name = "brutto_client_buy_price", nullable = false)
    private BigDecimal bruttoClientBuyPrice;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "availability", nullable = false)
    private String availability;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<ProductShop> productShops;
}
