package com.master.cw_backend.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.master.cw_backend.entities.UserEntity;
import com.master.cw_backend.repositories.UserRepository;

public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final UserEntity foundUser = userRepository.findByUserEmail(username);
        if (foundUser == null) {
            throw new UsernameNotFoundException(username);
        }

        Boolean enabled = !foundUser.isAccountNonExpired();

        UserDetails user = User.withUsername(foundUser.getUserEmail())
                .password(foundUser.getUserPassword()).disabled(enabled)
                .authorities("USER").build();

        return user;
    }

}
