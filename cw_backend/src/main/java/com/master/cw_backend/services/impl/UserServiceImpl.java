package com.master.cw_backend.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.master.cw_backend.constants.AppConstants.Sex;
import com.master.cw_backend.dtos.UserDto;
import com.master.cw_backend.entities.UserEntity;
import com.master.cw_backend.exceptions.ResourceNotFoundException;
import com.master.cw_backend.repositories.UserRepository;
import com.master.cw_backend.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) {

        String encoded = this.passwordEncoder.encode(userDto.getUserPassword());

        userDto.setUserPassword(encoded);

        UserEntity userEntity = this.userDtoToEntity(userDto);

        UserEntity savedUser = this.userRepository.save(userEntity);

        return this.userEntityToDto(savedUser);
    }

    @Override
    public UserDto updateUser(UserDto userDto, Long id) {
        UserEntity userEntity = this.userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        String userName = userDto.getUserName();
        if (userName != null) {
            userEntity.setUserName(userName);
        }

        String userEmail = userDto.getUserEmail();
        if (userEmail != null) {
            userEntity.setUserEmail(userEmail);
        }

        String userMobile = userDto.getUserMobile();
        if (userMobile != null) {
            userEntity.setUserMobile(userMobile);
        }

        Integer userAge = userDto.getUserAge();
        if (userAge != null) {
            userEntity.setUserAge(userAge);
        }

        Sex userSex = userDto.getUserSex();
        if (userSex != null) {
            userEntity.setUserSex(userSex);
        }

        String userPassword = userDto.getUserPassword();
        if (userPassword != null) {
            String encoded = this.passwordEncoder.encode(userPassword);
            userEntity.setUserPassword(encoded);
        }

        UserEntity updatedUser = this.userRepository.save(userEntity);

        return this.userEntityToDto(updatedUser);
    }

    @Override
    public UserDto getUserById(Long id) {
        UserEntity userEntity = this.userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        return this.userEntityToDto(userEntity);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<UserEntity> users = this.userRepository.findAll();

        List<UserDto> userDtos = users.stream().map(user -> this.userEntityToDto(user)).collect(Collectors.toList());

        return userDtos;
    }

    @Override
    public Boolean deleteUser(Long id) {
        UserEntity userEntity = this.userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        this.userRepository.delete(userEntity);

        return true;
    }

    @Override
    public UserDto userEntityToDto(UserEntity userEntity) {
        UserDto dto = this.modelMapper.map(userEntity, UserDto.class);
        return dto;
    }

    @Override
    public UserEntity userDtoToEntity(UserDto userDto) {
        UserEntity entity = this.modelMapper.map(userDto, UserEntity.class);
        return entity;
    }

}
