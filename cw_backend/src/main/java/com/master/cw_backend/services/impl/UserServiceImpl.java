package com.master.cw_backend.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Override
    public UserDto createUser(UserDto userDto) {
        UserEntity userEntity = this.userDtoToEntity(userDto);
        UserEntity savedUser = this.userRepository.save(userEntity);

        return this.userEntityToDto(savedUser);
    }

    @Override
    public UserDto updateUser(UserDto userDto, Long id) {
        UserEntity userEntity = this.userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        userEntity.setUserName(userDto.getUserName());
        userEntity.setUserEmail(userDto.getUserEmail());
        userEntity.setUserMobile(userDto.getUserMobile());
        userEntity.setUserAge(userDto.getUserAge());
        userEntity.setUserSex(userDto.getUserSex());
        userEntity.setUserPassword(userDto.getUserPassword());

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
