package com.example.restapi.repository;

import com.example.restapi.entity.users.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MyUserRepository extends JpaRepository<MyUser, Integer> {
    MyUser findByUsername(String username);

    MyUser findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
