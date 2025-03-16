package com.emtech.Digital_Banking_Notification_Service.service;


import com.emtech.Digital_Banking_Notification_Service.dto.AccountEvent;
import com.emtech.Digital_Banking_Notification_Service.dto.NotificationRequest;
import com.emtech.Digital_Banking_Notification_Service.dto.TransactionEvent;
import com.emtech.Digital_Banking_Notification_Service.model.Notification;
import com.emtech.Digital_Banking_Notification_Service.repository.NotificationRepository;
import com.emtech.Digital_Banking_Notification_Service.utils.EmailUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final EmailUtil emailUtil;

    // Handle account events
    public void processAccountEvent(AccountEvent event) {
        String message = "Low Balance Alert! Your balance is below the threshold.";
        sendNotification(event.getEmail(), event.getPhoneNumber(), "Low Balance Alert", message);
    }

    // Handle transaction events
    public void processTransactionEvent(TransactionEvent event) {
        String message = "Transaction Successful: " + event.getTransactionType() + " of " + event.getAmount();
        sendNotification(event.getEmail(), event.getPhoneNumber(), "Transaction Alert", message);
    }

    private void sendNotification(String email, String phone, String subject, String message) {
        // Save to DB
        Notification notification = new Notification();
        notification.setRecipientEmail(email);
        notification.setPhone(phone);
        notification.setSubject(subject);
        notification.setMessage(message);
        notification.setSent(false);
        notificationRepository.save(notification);

        // Send Email
    }



    public void manualNotification(NotificationRequest request) {
        // Save notification to the database
        Notification notification = new Notification();
        notification.setRecipientEmail(request.getRecipientEmail());
        notification.setMessage(request.getMessage());
        notification.setSent(false); // Initially, mark as not sent

        notificationRepository.save(notification);

        // Send email
        emailUtil.sendEmail(request.getRecipientEmail(), request.getRecipientPhone(), request.getMessage());

        // Mark as sent after successful email
        notification.setSent(true);
        notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }
}
