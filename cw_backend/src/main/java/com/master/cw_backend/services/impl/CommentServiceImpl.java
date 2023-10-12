package com.master.cw_backend.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.master.cw_backend.dtos.CommentDto;
import com.master.cw_backend.entities.CommentEntity;
import com.master.cw_backend.exceptions.ResourceNotFoundException;
import com.master.cw_backend.repositories.CommentRepository;
import com.master.cw_backend.services.CommentService;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    CommentRepository commentRepository;

    @Override
    public CommentDto createComment(CommentDto commentDto) {
        CommentEntity commentEntity = this.commentDtoToEntity(commentDto);
        CommentEntity savedComment = this.commentRepository.save(commentEntity);

        return this.commentEntityToDto(savedComment);
    }

    @Override
    public CommentDto updateComment(CommentDto commentDto, Long id) {
        CommentEntity commentEntity = this.commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", id));

        commentEntity.setCommentContent(commentDto.getCommentContent());

        CommentEntity updatedComment = this.commentRepository.save(commentEntity);

        return this.commentEntityToDto(updatedComment);
    }

    @Override
    public List<CommentDto> getCommentsByPostId(Long postId) {
        List<CommentEntity> commentsList = this.commentRepository.findByPostId(postId);

        List<CommentDto> commentDtos = commentsList.stream().map(comment -> this.commentEntityToDto(comment))
                .collect(Collectors.toList());

        return commentDtos;
    }

    @Override
    public Boolean deleteComment(Long id) {
        CommentEntity commentEntity = this.commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", id));

        this.commentRepository.delete(commentEntity);

        return true;
    }

    @Override
    public CommentDto commentEntityToDto(CommentEntity commentEntity) {
        CommentDto commentDto = this.modelMapper.map(commentEntity, CommentDto.class);

        return commentDto;
    }

    @Override
    public CommentEntity commentDtoToEntity(CommentDto commentDto) {
        CommentEntity commentEntity = this.modelMapper.map(commentDto, CommentEntity.class);

        return commentEntity;
    }

}
