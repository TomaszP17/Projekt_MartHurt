package com.example.restapi.dto.response.user;

import java.util.Set;

public record UserResponseDTO(String username, String password, boolean enabled, Set<String> authorities) {}
