package com.example.restapi.dto;

import com.example.restapi.entity.Lighting;
import com.example.restapi.entity.Supplier;
import jakarta.persistence.*;

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
