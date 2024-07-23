package com.example.restapi.dto.response;

import java.math.BigDecimal;

public record LightingFromShoppingCartResponseDTO(
        String name,
        String imageUrl,
        String description,
        BigDecimal nettoClientBuyPrice,
        BigDecimal bruttoClientBuyPrice,
        BigDecimal quantity
) {
}
