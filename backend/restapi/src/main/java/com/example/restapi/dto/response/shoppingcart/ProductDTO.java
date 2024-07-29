package com.example.restapi.dto.response.shoppingcart;

import java.math.BigDecimal;

public record ProductDTO(
        String productId,
        String productName,
        BigDecimal clientBuyPriceBrutto,
        int quantity,
        String imageUrl,
        String availability
) {
}
