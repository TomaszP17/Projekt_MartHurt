package com.example.restapi.helpers;

import com.example.restapi.dto.response.LightingResponseDTO;

import java.util.Comparator;

public class ComparatorHelpers {
    public static Comparator<LightingResponseDTO> getComparator(String sortBy, String sortOrder) {
        if (sortBy == null || sortBy.isEmpty()) {
            return Comparator.comparing(LightingResponseDTO::productId);
        }

        Comparator<LightingResponseDTO> comparator = switch (sortBy) {
            case "productName" -> Comparator.comparing(LightingResponseDTO::productName);
            case "price" -> Comparator.comparing(LightingResponseDTO::bruttoClientBuyPrice);
            case "supplierName" -> Comparator.comparing(LightingResponseDTO::supplierName);
            default -> Comparator.comparing(LightingResponseDTO::productId);
        };

        if ("desc".equalsIgnoreCase(sortOrder)) {
            comparator = comparator.reversed();
        }

        return comparator;
    }
}
