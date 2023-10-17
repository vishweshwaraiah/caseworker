package com.master.cw_backend.utils;

import java.util.List;

import com.master.cw_backend.dtos.PostDto;

import lombok.Data;

@Data
public class PostResponse {

    private List<PostDto> posts;
    private Integer pageNumber;
    private Integer pageSize;
    private Long totalElements;
    private Integer totalPages;
    private Boolean lastpage;

}
