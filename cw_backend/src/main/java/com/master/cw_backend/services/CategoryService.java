package com.master.cw_backend.services;

import java.util.List;

import com.master.cw_backend.dtos.CategoryDto;
import com.master.cw_backend.entities.CategoryEntity;

public interface CategoryService {

    CategoryDto createCategory(CategoryDto categoryDto);

    CategoryDto updateCategory(CategoryDto categoryDto, Long id);

    CategoryDto getCategoryById(Long id);

    List<CategoryDto> getAllCategories();

    Boolean deleteCategory(Long id);

    CategoryDto categoryEntityToDto(CategoryEntity categoryEntity);

    CategoryEntity categoryDtoToEntity(CategoryDto categoryDto);
}
