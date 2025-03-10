package com.emtech.Digital_Banking_User_service.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
    private String role;
}
