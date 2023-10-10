package com.master.cw_backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.master.cw_backend.entities.CategoryEntity;
import com.master.cw_backend.entities.PostEntity;
import com.master.cw_backend.entities.UserEntity;

public interface PostRepository extends JpaRepository<PostEntity, Long> {

    List<PostEntity> findByUser(UserEntity user);

    List<PostEntity> findByCategory(CategoryEntity category);

    List<PostEntity> findByCategoryAndUser(CategoryEntity categoryEntity, UserEntity userEntity);
}
