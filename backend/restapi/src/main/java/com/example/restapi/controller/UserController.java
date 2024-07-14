package com.example.restapi.controller;

import com.example.restapi.dto.request.UserRequestDTO;
import com.example.restapi.dto.response.UserResponseDTO;
import com.example.restapi.service.MyUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final MyUserService userService;

    public UserController(MyUserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponseDTO> addUser(@RequestBody UserRequestDTO user){
        UserResponseDTO createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getUsers(){
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("{userId}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable int userId){
        try{
            return ResponseEntity.ok(userService.getUser(userId));
        }catch (UsernameNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable int userId){
        try {
            userService.deleteUser(userId);
            return ResponseEntity.noContent().build();
        }catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
