package com.master.ims_mart.utils;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private String message;
    private String displayMessage;
    private Boolean success = false;
    private Date timestamp = new Date();
}
