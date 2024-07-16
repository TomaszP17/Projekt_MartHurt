package com.example.restapi.dto.response;

import com.example.restapi.entity.Authority;

import java.util.Set;

public record UserResponseDTO(String username, String password, boolean enabled, Set<String> authorities) {}
