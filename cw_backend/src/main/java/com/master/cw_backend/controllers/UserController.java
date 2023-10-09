package com.master.cw_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.master.cw_backend.dtos.UserDto;
import com.master.cw_backend.services.UserService;
import com.master.cw_backend.utils.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/user")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
        UserDto createUser = this.userService.createUser(userDto);

        return new ResponseEntity<UserDto>(createUser, HttpStatus.CREATED);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto, @PathVariable("id") Long id) {
        UserDto updateUser = this.userService.updateUser(userDto, id);

        return ResponseEntity.ok(updateUser);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable("id") Long id) {
        Boolean delete = this.userService.deleteUser(id);

        return new ResponseEntity<ApiResponse>(new ApiResponse("User deleted successfully!", delete), HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = this.userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long id) {
        UserDto userDto = this.userService.getUserById(id);

        return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
    }

}
