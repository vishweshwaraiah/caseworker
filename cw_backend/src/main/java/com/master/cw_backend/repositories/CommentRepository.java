package com.master.cw_backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.master.cw_backend.entities.CommentEntity;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    List<CommentEntity> findByPostId(Long postId);

}
