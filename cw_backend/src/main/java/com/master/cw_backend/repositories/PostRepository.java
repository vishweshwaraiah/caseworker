package com.master.cw_backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.master.cw_backend.entities.CategoryEntity;
import com.master.cw_backend.entities.PostEntity;
import com.master.cw_backend.entities.UserEntity;

public interface PostRepository extends JpaRepository<PostEntity, Long> {

    List<PostEntity> findByUser(UserEntity user);

    List<PostEntity> findByCategory(CategoryEntity category);

    List<PostEntity> findByCategoryAndUser(CategoryEntity categoryEntity, UserEntity userEntity);

    @Query("SELECT p FROM PostEntity p WHERE p.postTitle LIKE :key% OR p.postContent LIKE :key")
    List<PostEntity> findBySearchkey(@Param("key") String keyword);
}
