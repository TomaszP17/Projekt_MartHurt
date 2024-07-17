package com.example.restapi.dto.response;

import java.util.List;

public record LightingResponseDTO(
        List<String> urlImages,
        String productName,
        String productId,
        String supplierName
) {
}
