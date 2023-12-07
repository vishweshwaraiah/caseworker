package com.master.ims_mart.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.master.ims_mart.dtos.RoleDto;
import com.master.ims_mart.entities.RoleEntity;
import com.master.ims_mart.exceptions.ResourceNotFoundException;
import com.master.ims_mart.repositories.RoleRepository;
import com.master.ims_mart.services.RoleService;

public class RoleServiceImpl implements RoleService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public RoleDto createRole(RoleDto roleDto) {
        RoleEntity roleEntity = this.roleDtoToEntity(roleDto);

        RoleEntity savedRole = this.roleRepository.save(roleEntity);

        return this.roleEntityToDto(savedRole);
    }

    @Override
    public RoleDto updateRole(RoleDto roleDto, Long id) {
        RoleEntity roleEntity = this.roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", id));

        roleEntity.setRoleName(roleDto.getRoleName());

        RoleEntity updatedRole = this.roleRepository.save(roleEntity);

        return this.roleEntityToDto(updatedRole);
    }

    @Override
    public RoleDto getRoleById(Long id) {
        RoleEntity roleEntity = this.roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", id));

        return this.roleEntityToDto(roleEntity);
    }

    @Override
    public List<RoleDto> getAllRoles() {
        List<RoleEntity> rolesList = this.roleRepository.findAll();

        List<RoleDto> dtoRoles = rolesList.stream().map((role) -> this.roleEntityToDto(role))
                .collect(Collectors.toList());

        return dtoRoles;
    }

    @Override
    public Boolean deleteRole(Long id) {
        RoleEntity roleEntity = this.roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", id));

        this.roleRepository.delete(roleEntity);

        return true;
    }

    @Override
    public RoleDto roleEntityToDto(RoleEntity roleEntity) {
        RoleDto roleDto = this.modelMapper.map(roleEntity, RoleDto.class);
        return roleDto;
    }

    @Override
    public RoleEntity roleDtoToEntity(RoleDto roleDto) {
        RoleEntity roleEntity = this.modelMapper.map(roleDto, RoleEntity.class);
        return roleEntity;
    }

}
