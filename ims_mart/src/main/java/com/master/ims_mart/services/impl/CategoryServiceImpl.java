package com.master.ims_mart.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.master.ims_mart.dtos.CategoryDto;
import com.master.ims_mart.entities.CategoryEntity;
import com.master.ims_mart.exceptions.ResourceNotFoundException;
import com.master.ims_mart.repositories.CategoryRepository;
import com.master.ims_mart.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        CategoryEntity categoryEntity = this.categoryDtoToEntity(categoryDto);
        CategoryEntity savedCategory = this.categoryRepository.save(categoryEntity);

        return this.categoryEntityToDto(savedCategory);
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, Long id) {
        CategoryEntity categoryEntity = this.categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

        categoryEntity.setCategoryTitle(categoryDto.getCategoryTitle());
        categoryEntity.setCategoryDescription(categoryDto.getCategoryDescription());

        CategoryEntity updatedCategory = this.categoryRepository.save(categoryEntity);

        return this.categoryEntityToDto(updatedCategory);
    }

    @Override
    public CategoryDto getCategoryById(Long id) {
        CategoryEntity categoryEntity = this.categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

        return this.categoryEntityToDto(categoryEntity);
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<CategoryEntity> categories = this.categoryRepository.findAll();

        List<CategoryDto> categoryDtos = categories.stream().map((category) -> this.categoryEntityToDto(category))
                .collect(Collectors.toList());

        return categoryDtos;
    }

    @Override
    public Boolean deleteCategory(Long id) {
        CategoryEntity categoryEntity = this.categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

        this.categoryRepository.delete(categoryEntity);

        return true;
    }

    @Override
    public CategoryDto categoryEntityToDto(CategoryEntity categoryEntity) {
        CategoryDto categoryDto = this.modelMapper.map(categoryEntity, CategoryDto.class);

        return categoryDto;
    }

    @Override
    public CategoryEntity categoryDtoToEntity(CategoryDto categoryDto) {
        CategoryEntity categoryEntity = this.modelMapper.map(categoryDto, CategoryEntity.class);

        return categoryEntity;
    }

}
