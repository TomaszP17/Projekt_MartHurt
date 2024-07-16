package com.example.restapi.dto.response;

import java.util.Set;

public record UserResponseDTO(String username, String password, boolean enabled, Set<String> authorities) {}
