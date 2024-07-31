package com.example.restapi.dto.response.lighting;

import java.math.BigDecimal;

public record LightingAdminDashboardResponseDTO(
        String id,
        String productName,
        String imageUrl,
        String description,
        BigDecimal nettoPrice,
        BigDecimal bruttoPrice,
        String shopName,
        String productMarking
) {
}
