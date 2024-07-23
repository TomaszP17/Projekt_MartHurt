package com.example.restapi.service.myuser;

import com.example.restapi.dto.request.UserRequestDTO;
import com.example.restapi.dto.response.user.UserResponseDTO;
import com.example.restapi.exceptions.FoundMoreThanOneUserException;

import java.util.List;

public interface MyUserService {
    List<UserResponseDTO> getUsers();
    UserResponseDTO createUser(UserRequestDTO userDTO);
    void deleteUser(int userId) throws FoundMoreThanOneUserException;
    UserResponseDTO getUser(int id);
}
