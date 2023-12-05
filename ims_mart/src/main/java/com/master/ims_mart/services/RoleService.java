package com.master.ims_mart.services;

import java.util.List;

import com.master.ims_mart.dtos.RoleDto;
import com.master.ims_mart.entities.RoleEntity;

public interface RoleService {

    RoleDto createRole(RoleDto roleDto);

    RoleDto updateRole(RoleDto roleDto, Long id);

    RoleDto getRoleById(Long id);

    List<RoleDto> getAllRoles();

    Boolean deleteRole(Long id);

    RoleDto roleEntityToDto(RoleEntity roleEntity);

    RoleEntity roleDtoToEntity(RoleDto roleDto);
}
