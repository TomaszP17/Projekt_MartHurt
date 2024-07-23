package com.example.restapi.entity.products;

import com.example.restapi.entity.Comment;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
    @JoinColumn(name = "supplier_original_id", referencedColumnName = "id", nullable = false)
    private Supplier supplier;

    @Column(name = "product_original_name", nullable = false)
    private String productOriginalName;

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

    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "availability", nullable = false)
    private String availability;

    @Column(name = "date_added", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime dateAdded;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<ProductShop> productShops;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Image> images;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Comment> comments;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<ProductShoppingCart> productShoppingCarts;
}
