package com.master.cw_backend.services;

import java.util.List;

import com.master.cw_backend.dtos.UserDto;
import com.master.cw_backend.entities.UserEntity;

public interface UserService {

    UserDto createUser(UserDto userDto);

    UserDto updateUser(UserDto userDto, Long id);

    UserDto getUserById(Long id);

    UserDto getUserByEmail(String userEmail);

    List<UserDto> getAllUsers();

    Boolean deleteUser(Long id);

    UserDto userEntityToDto(UserEntity userEntity);

    UserEntity userDtoToEntity(UserDto userDto);
}
