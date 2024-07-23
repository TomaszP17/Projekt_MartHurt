package com.example.restapi.dto.response.shoppingcart;

import java.math.BigDecimal;

public record ShoppingCartProductDTO(
        String imageUrl,
        String productName,
        BigDecimal clientBuyPriceBrutto,
        int quantity
) {
}
