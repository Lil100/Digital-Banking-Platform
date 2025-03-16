package com.emtech.Digital_Banking_Notification_Service.service;


import com.emtech.Digital_Banking_Notification_Service.utils.EmailUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final EmailUtil emailUtil;

    public void sendEmail(String to, String subject, String message) {
        emailUtil.sendEmail(to, subject, message);
    }
}