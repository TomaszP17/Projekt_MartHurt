package com.example.restapi.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record LightingResponseDTO(
        List<String> urlImages,
        String productName,
        String productId,
        String name,
        BigDecimal bruttoClientBuyPrice,
        LocalDateTime dateAdded
) {
}
