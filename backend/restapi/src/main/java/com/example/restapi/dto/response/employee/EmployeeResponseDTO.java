package com.example.restapi.dto.response.employee;

import java.util.List;

public record EmployeeResponseDTO(
        int id,
        String email,
        String username,
        List<com.example.restapi.enums.RoleType> roles
) {
}
