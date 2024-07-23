package com.example.restapi.helpers;

import com.example.restapi.dto.response.lighting.LightingResponseDTO;

import java.util.Comparator;

public class ComparatorHelpers {
    /**
     * Get Comparator to sort lightings by param {sortBy} and param {sortOrder}
     * @param sortBy lighting param
     * @param sortOrder ASC or DESC
     * @return comparator
     */
    public static Comparator<LightingResponseDTO> getComparator(String sortBy, String sortOrder) {

        if (sortBy == null || sortBy.isEmpty()) {
            return Comparator.comparing(LightingResponseDTO::productId);
        }

        Comparator<LightingResponseDTO> comparator = switch (sortBy) {
            case "dateAdded" -> Comparator.comparing(LightingResponseDTO::dateAdded);
            case "productName" -> Comparator.comparing(LightingResponseDTO::productName);
            case "price" -> Comparator.comparing(LightingResponseDTO::bruttoClientBuyPrice);
            default -> Comparator.comparing(LightingResponseDTO::productId);
        };

        if ("desc".equalsIgnoreCase(sortOrder)) {
            comparator = comparator.reversed();
        }

        return comparator;
    }
}
