package com.example.restapi.repository;

import com.example.restapi.entity.users.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MyUserRepository extends JpaRepository<MyUser, Integer> {
    Optional<MyUser> findByUsername(String username);
}
