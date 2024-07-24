package com.example.restapi.dto.response.user;

import com.example.restapi.enums.RoleType;

import java.util.Set;

public record UserResponseDTO(String username, String password, boolean enabled, Set<RoleType> authorities) {}
