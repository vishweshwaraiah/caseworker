package com.master.ims_mart.services;

import java.util.List;

import com.master.ims_mart.dtos.CategoryDto;
import com.master.ims_mart.entities.CategoryEntity;

public interface CategoryService {

    CategoryDto createCategory(CategoryDto categoryDto);

    CategoryDto updateCategory(CategoryDto categoryDto, Long id);

    CategoryDto getCategoryById(Long id);

    List<CategoryDto> getAllCategories();

    Boolean deleteCategory(Long id);

    CategoryDto categoryEntityToDto(CategoryEntity categoryEntity);

    CategoryEntity categoryDtoToEntity(CategoryDto categoryDto);
}
