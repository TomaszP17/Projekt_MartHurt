package com.example.restapi.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    private String username;
    private String password;
    private String email;
    private String adminName;
    private boolean enabled;
    private Set<Integer> authoritiesId;
}
