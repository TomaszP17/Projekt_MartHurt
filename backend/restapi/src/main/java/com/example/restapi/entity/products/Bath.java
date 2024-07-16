package com.example.restapi.entity.products;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bath")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Bath {

    @Id
    @Column(name = "product_id")
    private String productId;

    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;
}
