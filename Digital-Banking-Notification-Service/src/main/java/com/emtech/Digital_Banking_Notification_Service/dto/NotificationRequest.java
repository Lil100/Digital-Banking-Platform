package com.emtech.Digital_Banking_Notification_Service.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationRequest {
    private String recipientEmail;
    private String recipientPhone;
    private String message;
}
