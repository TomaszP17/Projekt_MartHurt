package com.example.restapi.dto.response.lighting;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LightingFullResponseDTO{
    private String id;
    private String productMarkingsName;
    private String supplierName;
    private String productName;
    private BigDecimal nettoClientBuyPrice;
    private BigDecimal bruttoClientBuyPrice;
    private String description;
    private String availability;
    private Set<String> shopsNames;
    private Set<String> images;
}
