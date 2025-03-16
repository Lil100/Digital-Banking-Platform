package com.emtech.Digital_Banking_Notification_Service.controller;


import com.emtech.Digital_Banking_Notification_Service.dto.NotificationRequest;
import com.emtech.Digital_Banking_Notification_Service.model.Notification;
import com.emtech.Digital_Banking_Notification_Service.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody NotificationRequest request) {
        notificationService.manualNotification(request);
        return ResponseEntity.ok("Notification Sent Successfully");
    }

    @GetMapping("/")
    public ResponseEntity<List<Notification>> getAllNotifications() {
        return ResponseEntity.ok(notificationService.getAllNotifications());
    }
}
