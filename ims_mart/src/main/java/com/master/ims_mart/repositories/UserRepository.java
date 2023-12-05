package com.master.ims_mart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.master.ims_mart.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUserEmail(String userEmail);

    UserEntity findByUserMobile(String userMobile);
}
