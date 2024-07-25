package com.example.restapi.helpers.filter;

import com.example.restapi.helpers.util.JwtUtil;
import com.example.restapi.service.myuser.MyUserServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    private JwtUtil jwtUtil;
    private MyUserServiceImpl userService;
    //
    //nie ruszac tego lazy bo kurwa zabije
    //
    public AuthTokenFilter(JwtUtil jwtUtil, @Lazy MyUserServiceImpl userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            String jwt = parseJwt(request);
            System.out.println("JWT token: " + jwt);
            if (jwt != null && jwtUtil.validateJwtToken(jwt)) {
                System.out.println("JWT Token is valid.");
                String username = jwtUtil.getUserNameFromJwtToken(jwt);
                System.out.println("Username from JWT: " + username);
                UserDetails userDetails = userService.loadUserByUsername(username);
                System.out.println("User details loaded: " + userDetails);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("User authenticated: " + SecurityContextHolder.getContext().getAuthentication());
            } else {
                System.out.println("Invalid JWT Token.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Cannot set user authentication: " + e.getMessage());
        }
        filterChain.doFilter(request, response);
    }


    private String parseJwt(HttpServletRequest request){
        String headerAuth = request.getHeader("Authorization");
        if(headerAuth != null && headerAuth.startsWith("Bearer ")){
            return headerAuth.substring(7);
        }
        return null;
    }
}
