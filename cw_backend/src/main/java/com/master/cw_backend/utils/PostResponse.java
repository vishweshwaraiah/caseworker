package com.master.cw_backend.utils;

import java.util.List;

import com.master.cw_backend.dtos.PostDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class PostResponse {

    private List<PostDto> posts;
    private Integer pageNumber;
    private Integer pazeSize;
    private Long totalElements;
    private Integer totalPages;
    private Boolean lastpage;

}
