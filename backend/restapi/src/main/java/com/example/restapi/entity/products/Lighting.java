package com.example.restapi.entity.products;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lighting")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Lighting {

    @Id
    @Column(name = "product_id")
    private String productId;

    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;
}
