package com.example.restapi.repository;

import com.example.restapi.entity.RefreshToken;
import com.example.restapi.entity.users.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
    RefreshToken findByToken(String token);
    void deleteByMyUser(MyUser myUser);
}
