package com.example.restapi.dto.response;

import java.math.BigDecimal;
import java.util.List;

public record LightingResponseDTO(
        List<String> urlImages,
        String productName,
        String productId,
        String supplierName,
        BigDecimal bruttoClientBuyPrice
) {
}
