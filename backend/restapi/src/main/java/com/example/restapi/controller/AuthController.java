package com.example.restapi.controller;

import com.example.restapi.dto.request.RegisterRequestDTO;
import com.example.restapi.dto.request.SignInRequest;
import com.example.restapi.dto.response.JwtResponse;
import com.example.restapi.entity.users.Authority;
import com.example.restapi.entity.users.MyUser;
import com.example.restapi.entity.users.MyUserAuthority;
import com.example.restapi.enums.RoleType;
import com.example.restapi.helpers.util.JwtUtil;
import com.example.restapi.repository.AuthorityRepository;
import com.example.restapi.repository.MyUserAuthorityRepository;
import com.example.restapi.repository.MyUserRepository;
import com.example.restapi.security.MyUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final MyUserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final MyUserAuthorityRepository userAuthorityRepository;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager,
                          AuthorityRepository authorityRepository,
                          JwtUtil jwtUtil,
                          PasswordEncoder passwordEncoder,
                          MyUserRepository userRepository,
                          MyUserAuthorityRepository userAuthorityRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.authorityRepository = authorityRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.userAuthorityRepository = userAuthorityRepository;
    }

    /**
     * Endpoint to log in on website, if user will login correctly there will be return dto with jwt token
     * @param signInRequest username (string), password (string)
     * @return DTO or HttpStatus.UN_Authorized
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody SignInRequest signInRequest){
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtil.generateJwtToken(authentication);
            MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();
            JwtResponse res = new JwtResponse();
            res.setToken(jwt);
            res.setId(userDetails.getId());
            res.setUsername(userDetails.getUsername());
            res.setRoles(roles);
            return ResponseEntity.ok(res);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Problem with authorization");
        }
    }

    /**
     * Endpoint to register on website and create account in db. Always save user role as 'ROLE_USER' only admin could
     * change it on admin dashboard
     * @param registerRequest username (String), email (String), password (String)
     * @return information about register operation
     */
    /*@PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO registerRequest){
        if(userRepository.existsByUsername(registerRequest.getUsername())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("username is already taken");
        }
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("email is already taken");
        }
        String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());
        Set<Authority> roles = new HashSet<>();
        Authority role = authorityRepository.findByName(RoleType.ROLE_USER);

        if(role == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("role not found");
        }

        roles.add(role);
        MyUser myUser = new MyUser();
        Set<MyUserAuthority> userAuthorities = roles
                .stream()
                .map(e -> new MyUserAuthority(myUser, e))
                .collect(Collectors.toSet());

        myUser.setUsername(registerRequest.getUsername());
        myUser.setEmail(registerRequest.getEmail());
        myUser.setPassword(hashedPassword);
        myUser.setUserAuthorities(userAuthorities);

        userRepository.save(myUser);
        userAuthorityRepository.saveAll(userAuthorities);

        return ResponseEntity.ok("User registered successfully");
    }*/

}
