package com.example.restapi.service.myuser;

import com.example.restapi.dto.request.UserRequestDTO;
import com.example.restapi.dto.response.user.UserResponseDTO;
import com.example.restapi.entity.users.Authority;
import com.example.restapi.entity.users.MyUser;
import com.example.restapi.entity.users.MyUserAuthority;
import com.example.restapi.exceptions.FoundMoreThanOneUserException;
import com.example.restapi.repository.AuthorityRepository;
import com.example.restapi.repository.MyUserAuthorityRepository;
import com.example.restapi.repository.MyUserRepository;
import com.example.restapi.security.MyUserDetails;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public MyUserServiceImpl(PasswordEncoder passwordEncoder,
                             MyUserRepository myUserRepository,
                             MyUserAuthorityRepository myUserAuthorityRepository,
                             AuthorityRepository authorityRepository
    ) {
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
                                .map(auth -> auth.getAuthority().getName())
                                .collect(Collectors.toSet())))
                .collect(Collectors.toList());

    }

    public UserResponseDTO getUser(int userId) {
        Optional<MyUser> userOptional = myUserRepository.findById(userId);
        MyUser user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User with id " + userId + " not found"));

        return new UserResponseDTO(
                user.getUsername(),
                user.getPassword(),
                user.isEnabled(),
                user.getUserAuthorities()
                        .stream()
                        .map(auth -> auth.getAuthority().getName())
                        .collect(Collectors.toSet())
        );
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
                authorities.stream().map(Authority::getName).collect(Collectors.toSet()));
    }

    @Transactional
    public void deleteUser(int userId) throws FoundMoreThanOneUserException {
        // Get dbResult
        Optional<MyUser> dbResult = myUserRepository.findById(userId);

        if (dbResult.isEmpty()) {
            throw new UsernameNotFoundException("User with that id is not found");
        }

        MyUser user = dbResult.get();

        // Ensure there is only one user found
        long numberOfUsersFound = dbResult.stream().count();
        if (numberOfUsersFound != 1) {
            throw new FoundMoreThanOneUserException("In database are more than 1 user with that Id");
        }

        // Delete related authorities
        Set<MyUserAuthority> userAuthorities = user.getUserAuthorities();
        if (userAuthorities != null && !userAuthorities.isEmpty()) {
            userAuthorities.forEach(auth -> myUserAuthorityRepository.delete(auth));
        }

        // Delete user
        myUserRepository.delete(user);
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MyUser user = myUserRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        System.out.println(user);
        return new MyUserDetails(user);
    }

//    private String[] getRoles(MyUser user) {
//        if (user.getUserAuthorities() == null) {
//            return new String[]{"USER"};
//        }
//        return user.getUserAuthorities().stream()
//                .map(e -> e.getAuthority().getName())
//                .toArray(String[]::new);
//    }

}
