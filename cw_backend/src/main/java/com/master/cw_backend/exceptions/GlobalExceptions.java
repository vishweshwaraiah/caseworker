package com.master.cw_backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.master.cw_backend.utils.ApiResponse;

import jakarta.validation.UnexpectedTypeException;

@RestControllerAdvice
public class GlobalExceptions {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException ex) {
        String errorMessage = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(errorMessage, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnexpectedTypeException.class)
    public ResponseEntity<ApiResponse> unexpectedTypeExceptionHandler(UnexpectedTypeException ex) {
        String errorMessage = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(errorMessage, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse> httpMessageNotReadableExceptionHandler(HttpMessageNotReadableException ex) {
        String errorMessage = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(errorMessage, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);
    }
}
