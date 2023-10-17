package com.master.cw_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.master.cw_backend.security.JwtHelper;
import com.master.cw_backend.utils.JwtRequest;
import com.master.cw_backend.utils.JwtResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    JwtHelper jwtHelper;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest jwtRequest) {
        this.doAuthenticate(jwtRequest.getUserEmail(), jwtRequest.getUserPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUserEmail());

        String token = this.jwtHelper.generateToken(userDetails);

        JwtResponse response = JwtResponse.builder().jwtToken(token).userName(userDetails.getUsername()).build();

        return new ResponseEntity<JwtResponse>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String userEmail, String userPassword) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userEmail,
                userPassword);

        try {
            manager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid User name or User passowrd!");
        }
    }
}
