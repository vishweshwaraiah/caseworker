package com.master.cw_backend.services;

import java.util.List;

import com.master.cw_backend.dtos.CommentDto;
import com.master.cw_backend.entities.CommentEntity;

public interface CommentService {
    CommentDto createComment(CommentDto commentDto);

    CommentDto updateComment(CommentDto commentDto, Long id);

    List<CommentDto> getCommentsByPostId(Long postId);

    Boolean deleteComment(Long id);

    CommentDto commentEntityToDto(CommentEntity commentEntity);

    CommentEntity commentDtoToEntity(CommentDto commentDto);
}
