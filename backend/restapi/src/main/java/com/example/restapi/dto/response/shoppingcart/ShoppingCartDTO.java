package com.example.restapi.dto.response.shoppingcart;

import java.time.LocalDateTime;

public record ShoppingCartDTO(
        int id,
        LocalDateTime createDate,
        int employeeMyUserId
) {
}
