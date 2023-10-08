package com.master.cw_backend.dtos;

import com.master.cw_backend.constants.AppConstants.Sex;

import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class UserDto {

    private Long id;

    @NotEmpty
    @Size(min = 5, message = "User name must be at least 5 chars long!")
    private String userName;

    @Email(message = "User Email must be valid!")
    @Size(min = 8, message = "User Email must be at least 8 chars long!")
    private String userEmail;

    @NotEmpty
    @Size(min = 10, max = 12, message = "User Mobile must be valid!")
    private String userMobile;

    @NotNull
    @Min(value = 0)
    private Integer userAge;

    @Enumerated
    private Sex userSex;

    @NotEmpty
    @NotBlank
    @Size(min = 8, max = 24, message = "User Password must be 8 to 24 chars long!")
    private String userPassword;
}
