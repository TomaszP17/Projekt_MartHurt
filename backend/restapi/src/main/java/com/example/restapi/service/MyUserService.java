package com.example.restapi.service;

import com.example.restapi.dto.request.UserRequestDTO;
import com.example.restapi.dto.response.UserResponseDTO;

import java.util.List;

public interface MyUserService {
    List<UserResponseDTO> getUsers();
    UserResponseDTO createUser(UserRequestDTO userDTO);
}
