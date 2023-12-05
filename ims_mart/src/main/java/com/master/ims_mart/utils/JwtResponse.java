package com.master.ims_mart.utils;

import com.master.ims_mart.constants.AppConstants.Sex;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtResponse {

    private String jwtToken;

    private Long id;

    private String userName;

    private String userEmail;

    private String userMobile;

    private Integer userAge;

    private Sex userSex;
}
