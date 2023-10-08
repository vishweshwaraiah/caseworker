package com.master.cw_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.master.cw_backend.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

}
