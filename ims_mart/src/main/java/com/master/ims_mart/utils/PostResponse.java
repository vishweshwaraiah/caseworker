package com.master.ims_mart.utils;

import java.util.List;

import com.master.ims_mart.dtos.PostDto;

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
