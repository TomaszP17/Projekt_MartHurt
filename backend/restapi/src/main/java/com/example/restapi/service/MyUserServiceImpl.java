package com.example.restapi.service;

import com.example.restapi.dto.request.UserRequestDTO;
import com.example.restapi.dto.response.UserResponseDTO;
import com.example.restapi.entity.Authority;
import com.example.restapi.entity.MyUser;
import com.example.restapi.entity.MyUserAuthority;
import com.example.restapi.repository.AuthorityRepository;
import com.example.restapi.repository.MyUserAuthorityRepository;
import com.example.restapi.repository.MyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MyUserServiceImpl implements UserDetailsService, MyUserService {

    private final PasswordEncoder passwordEncoder;
    private final MyUserRepository myUserRepository;
    private final MyUserAuthorityRepository myUserAuthorityRepository;
    private final AuthorityRepository authorityRepository;

    public MyUserServiceImpl(PasswordEncoder passwordEncoder,MyUserRepository myUserRepository, MyUserAuthorityRepository myUserAuthorityRepository, AuthorityRepository authorityRepository) {
        this.passwordEncoder = passwordEncoder;
        this.myUserRepository = myUserRepository;
        this.myUserAuthorityRepository = myUserAuthorityRepository;
        this.authorityRepository = authorityRepository;
    }

    public List<UserResponseDTO> getUsers(){
        return myUserRepository
                .findAll()
                .stream()
                .map(e -> new UserResponseDTO(
                        e.getUsername(),
                        e.getPassword(),
                        e.isEnabled(),
                        e.getUserAuthorities().stream()
                                .map(auth -> auth.getAuthority().getAuthority())
                                .collect(Collectors.toSet())))
                .collect(Collectors.toList());

    }

    public UserResponseDTO createUser(UserRequestDTO userDTO) {

        // Encode password
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        // Get authorities from DB by IDs from DTO
        Set<Authority> authorities = new HashSet<>(authorityRepository.findAllById(userDTO.getAuthoritiesId()));

        // Create new User based on DTO data
        MyUser user = new MyUser(
                userDTO.getUsername(),
                userDTO.getPassword(),
                userDTO.isEnabled()
        );

        // Save the user to get an ID assigned
        MyUser savedUser = myUserRepository.save(user);

        // Link User with Authorities
        Set<MyUserAuthority> userAuthorities = new HashSet<>();
        for (Authority authority : authorities) {
            MyUserAuthority userAuthority = new MyUserAuthority(savedUser, authority);
            userAuthorities.add(userAuthority);
        }
        myUserAuthorityRepository.saveAll(userAuthorities);
        savedUser.setUserAuthorities(userAuthorities);

        return new UserResponseDTO(savedUser.getUsername(), savedUser.getPassword(), savedUser.isEnabled(),
                authorities.stream().map(Authority::getAuthority).collect(Collectors.toSet()));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<MyUser> user = myUserRepository.findByUsername(username);

        if(user.isPresent()){
            MyUser userObj = user.get();
            return User.builder()
                    .username(userObj.getUsername())
                    .password(userObj.getPassword())
                    .roles(getRoles(userObj))
                    .build();
        } else {
            throw new UsernameNotFoundException(username);
        }
    }

    private String[] getRoles(MyUser user) {
        if (user.getUserAuthorities() == null) {
            return new String[]{"USER"};
        }
        return user.getUserAuthorities().stream()
                .map(e -> e.getAuthority().getAuthorityName())
                .toArray(String[]::new);
    }

    //here will be
}
