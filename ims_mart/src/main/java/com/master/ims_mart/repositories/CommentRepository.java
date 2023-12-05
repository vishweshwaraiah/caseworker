package com.master.ims_mart.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.master.ims_mart.entities.CommentEntity;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    List<CommentEntity> findByPostId(Long postId);

}
