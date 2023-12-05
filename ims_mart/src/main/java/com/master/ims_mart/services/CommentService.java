package com.master.ims_mart.services;

import java.util.List;

import com.master.ims_mart.dtos.CommentDto;
import com.master.ims_mart.entities.CommentEntity;

public interface CommentService {
    CommentDto createComment(CommentDto commentDto);

    CommentDto updateComment(CommentDto commentDto, Long id);

    List<CommentDto> getCommentsByPostId(Long postId);

    Boolean deleteComment(Long id);

    CommentDto commentEntityToDto(CommentEntity commentEntity);

    CommentEntity commentDtoToEntity(CommentDto commentDto);
}
