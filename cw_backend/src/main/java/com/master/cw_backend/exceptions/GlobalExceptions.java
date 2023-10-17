package com.master.cw_backend.exceptions;

import java.util.HashMap;
import java.util.IllegalFormatFlagsException;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MultipartException;

import com.master.cw_backend.constants.AppConstants;
import com.master.cw_backend.utils.ApiResponse;

import jakarta.validation.UnexpectedTypeException;

@RestControllerAdvice
public class GlobalExceptions {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException ex) {
        String errorMessage = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(errorMessage, AppConstants.RESOURCE_NOT_FOUND, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnexpectedTypeException.class)
    public ResponseEntity<ApiResponse> unexpectedTypeExceptionHandler(UnexpectedTypeException ex) {
        String errorMessage = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(errorMessage, AppConstants.UNEXPECTED_TYPE, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse> httpMessageNotReadableExceptionHandler(HttpMessageNotReadableException ex) {
        String errorMessage = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(errorMessage, AppConstants.NOT_READABLE, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> methodArgumentNotValidExceptionHandler(
            MethodArgumentNotValidException ex) {
        Map<String, String> errorResp = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errorResp.put(fieldName, message);
        });

        return new ResponseEntity<Map<String, String>>(errorResp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalFormatFlagsException.class)
    public ResponseEntity<ApiResponse> illegalFormatFlagsExceptionHandler(IllegalFormatFlagsException ex) {
        String errorMessage = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(errorMessage, AppConstants.ILLEGAL_FORMAT, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<ApiResponse> multipartExceptionHandler(MultipartException ex) {
        String errorMessage = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(errorMessage, AppConstants.MULTIPART_UPLOAD, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ApiResponse> noSuchElementExceptionHandler(NoSuchElementException ex) {
        String errorMessage = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(errorMessage, AppConstants.ILLEGAL_FORMAT, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse> badCredentialsExceptionHandler(BadCredentialsException ex) {
        String errorMessage = ex.getMessage();
        ApiResponse apiResponse = new ApiResponse(errorMessage, AppConstants.BAD_CREDENTIALS, false);
        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.BAD_REQUEST);
    }
}
