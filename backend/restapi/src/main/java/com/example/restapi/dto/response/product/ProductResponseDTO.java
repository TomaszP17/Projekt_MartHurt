package com.example.restapi.dto.response.product;

import java.math.BigDecimal;

public record ProductResponseDTO(String id,
                                 String name,
                                 BigDecimal catalogPrice,
                                 BigDecimal purchasePrice,
                                 BigDecimal margin,
                                 String image,
                                 BigDecimal retailPrice,
                                 String specification
                                 ) {
}
