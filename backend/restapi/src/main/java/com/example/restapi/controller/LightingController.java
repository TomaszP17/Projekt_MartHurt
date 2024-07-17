package com.example.restapi.controller;

import com.example.restapi.dto.response.LightingResponseDTO;
import com.example.restapi.service.lighting.LightingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/lightings")
public class LightingController {

    private final LightingService lightingService;

    public LightingController(LightingService lightingService) {
        this.lightingService = lightingService;
    }

    @GetMapping
    public ResponseEntity<List<LightingResponseDTO>> getAllLighting() {
        List<LightingResponseDTO> lightings = lightingService.getAllLighting();
        return ResponseEntity.ok(lightings);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<LightingResponseDTO>> getFilteredLighting(
            @RequestParam BigDecimal priceFrom,
            @RequestParam BigDecimal priceTo,
            @RequestParam String supplierName
    ){

        List<LightingResponseDTO> lightingResponseDTOList = lightingService.getFilteredLighting(priceFrom, priceTo, supplierName);

        return ResponseEntity.ok(lightingResponseDTOList);
    }
}
