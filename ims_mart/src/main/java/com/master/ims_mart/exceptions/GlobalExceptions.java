package com.master.ims_mart.exceptions;

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

import com.master.ims_mart.constants.AppConstants;
import com.master.ims_mart.utils.ErrorResponse;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.validation.UnexpectedTypeException;

@RestControllerAdvice
public class GlobalExceptions {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException ex) {
        String errorMessage = ex.getMessage();
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(errorMessage);
        errorResponse.setDisplayMessage(AppConstants.RESOURCE_NOT_FOUND);
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnexpectedTypeException.class)
    public ResponseEntity<ErrorResponse> unexpectedTypeExceptionHandler(UnexpectedTypeException ex) {
        String errorMessage = ex.getMessage();
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(errorMessage);
        errorResponse.setDisplayMessage(AppConstants.UNEXPECTED_TYPE);
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> httpMessageNotReadableExceptionHandler(HttpMessageNotReadableException ex) {
        String errorMessage = ex.getMessage();
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(errorMessage);
        errorResponse.setDisplayMessage(AppConstants.NOT_READABLE);
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.NOT_FOUND);
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
    public ResponseEntity<ErrorResponse> illegalFormatFlagsExceptionHandler(IllegalFormatFlagsException ex) {
        String errorMessage = ex.getMessage();
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(errorMessage);
        errorResponse.setDisplayMessage(AppConstants.ILLEGAL_FORMAT);
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<ErrorResponse> multipartExceptionHandler(MultipartException ex) {
        String errorMessage = ex.getMessage();
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(errorMessage);
        errorResponse.setDisplayMessage(AppConstants.MULTIPART_UPLOAD);
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorResponse> noSuchElementExceptionHandler(NoSuchElementException ex) {
        String errorMessage = ex.getMessage();
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(errorMessage);
        errorResponse.setDisplayMessage(AppConstants.ILLEGAL_FORMAT);
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> badCredentialsExceptionHandler(BadCredentialsException ex) {
        String errorMessage = ex.getMessage();
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(errorMessage);
        errorResponse.setDisplayMessage(AppConstants.BAD_CREDENTIALS);
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<ErrorResponse> malformedJwtExceptionHandler(MalformedJwtException ex) {
        String errorMessage = ex.getMessage();
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(errorMessage);
        errorResponse.setDisplayMessage(AppConstants.MALFORMED_JWTTOKEN);
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ErrorResponse> expiredJwtExceptionHandler(ExpiredJwtException ex) {
        String errorMessage = ex.getMessage();
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(errorMessage);
        errorResponse.setDisplayMessage(AppConstants.EXPIRED_JWTTOKEN);
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> illegalArgumentExceptionHandler(IllegalArgumentException ex) {
        String errorMessage = ex.getMessage();
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(errorMessage);
        errorResponse.setDisplayMessage(AppConstants.ILLEGAL_JWTTOKEN);
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> exceptionHandler(Exception ex) {
        String errorMessage = ex.getMessage();
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(errorMessage);
        errorResponse.setDisplayMessage(AppConstants.GLOBAL_EXCEPTION);
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
