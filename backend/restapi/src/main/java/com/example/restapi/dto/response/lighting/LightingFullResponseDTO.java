package com.example.restapi.dto.response.lighting;

import java.math.BigDecimal;
import java.util.Set;

public record LightingFullResponseDTO(
    String id,
    String productMarkingsName,
    String supplierName,
    String productName,
    BigDecimal nettoClientBuyPrice,
    BigDecimal bruttoClientBuyPrice,
    String description,
    String availability,
    Set<String> shopsNames,
    Set<String> images
) {
}
