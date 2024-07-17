package com.example.restapi.service.lighting;

import com.example.restapi.dto.response.LightingResponseDTO;

import java.util.List;

public interface LightingService {
    List<LightingResponseDTO> getAllLighting();
    List<LightingResponseDTO> getFilteredLighting();
}
