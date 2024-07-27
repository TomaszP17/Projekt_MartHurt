package com.example.restapi.helpers.util;

import com.example.restapi.entity.RefreshToken;
import com.example.restapi.repository.MyUserRepository;
import com.example.restapi.repository.RefreshTokenRepository;
import com.example.restapi.security.MyUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

//TODO ROZDZIELIĆ DO SERWISU BO TO JEST ZŁA PRAKTYKA KURWA 🤓☝️
@Component
public class JwtUtil {

    @Value("${restapi.app.jwtSecret}")
    private String jwtSecret;

    @Value("${restapi.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    private MyUserRepository userRepository;

    private RefreshTokenRepository refreshTokenRepository;

    public JwtUtil(MyUserRepository userRepository, RefreshTokenRepository refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public String generateJwtToken(Authentication authentication){
        System.out.println(authentication.getPrincipal());
        MyUserDetails userPrincipal = (MyUserDetails) authentication.getPrincipal();

        String roles = userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));


        return Jwts
                .builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .claim("roles", roles)
                .compact();
    }

    public RefreshToken generateRefreshToken(Authentication authentication){
        MyUserDetails userPrincipal = (MyUserDetails) authentication.getPrincipal();

        RefreshToken refreshToken = RefreshToken.builder()
                .myUser(userRepository.findByUsername(userPrincipal.getUsername()))
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(604_800_000))
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public String getUserNameFromJwtToken(String token){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateJwtToken(String authToken){
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            System.out.println("Invalid JWT signature: {}" + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token: {}" + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("JWT token is expired {} " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("JWT token is unsupported {} " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty {} " + e.getMessage());
        }
        return false;
    }

    public RefreshToken validateExpirationDate(RefreshToken token){
        if(token.getExpiryDate().compareTo(Instant.now()) < 0){
            refreshTokenRepository.delete(token);
            throw new RuntimeException(token.getToken() + " : this token have expired. Please make a signin request");
        }
        return token;
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

}

