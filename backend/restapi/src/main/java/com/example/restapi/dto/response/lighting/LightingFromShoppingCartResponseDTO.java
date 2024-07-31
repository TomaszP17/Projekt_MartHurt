package com.example.restapi.dto.response.lighting;

import java.math.BigDecimal;

public record LightingFromShoppingCartResponseDTO(
        String name,
        String imageUrl,
        String description,
        BigDecimal nettoClientBuyPrice,
        BigDecimal bruttoClientBuyPrice,
        double quantity,
        double totalNettoPrice
) {
}
