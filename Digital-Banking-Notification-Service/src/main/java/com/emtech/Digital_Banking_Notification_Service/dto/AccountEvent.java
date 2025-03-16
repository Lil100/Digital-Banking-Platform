package com.emtech.Digital_Banking_Notification_Service.dto;


import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountEvent {
    private String accountId;
    private String eventType; // CREATED, UPDATED, DELETED
    private String email;
    private String phoneNumber;
    private String message;

}