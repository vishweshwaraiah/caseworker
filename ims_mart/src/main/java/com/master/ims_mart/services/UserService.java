package com.master.ims_mart.services;

import java.util.List;

import com.master.ims_mart.dtos.UserDto;
import com.master.ims_mart.entities.UserEntity;

public interface UserService {

    UserDto createUser(UserDto userDto);

    UserDto updateUser(UserDto userDto, Long id);

    UserDto getUserById(Long id);

    UserDto getUserByEmail(String userEmail);

    UserDto getUserByMobile(String userMobile);

    List<UserDto> getAllUsers();

    Boolean deleteUser(Long id);

    UserDto userEntityToDto(UserEntity userEntity);

    UserEntity userDtoToEntity(UserDto userDto);
}
