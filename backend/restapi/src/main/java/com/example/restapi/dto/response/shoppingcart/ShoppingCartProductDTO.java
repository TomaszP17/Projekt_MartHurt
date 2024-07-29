package com.example.restapi.dto.response.shoppingcart;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ShoppingCartProductDTO(

        int shoppingCartId,
        LocalDateTime createDate,
        int employeeMyUserId,
        List<ProductDTO> products
) {
}
