package com.emtech.Digital_Banking_Notification_Service.kafka;


import com.emtech.Digital_Banking_Notification_Service.dto.AccountEvent;
import com.emtech.Digital_Banking_Notification_Service.dto.TransactionEvent;
import com.emtech.Digital_Banking_Notification_Service.service.NotificationService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationConsumer {

    private final NotificationService notificationService;

    // Listener for account events (e.g., low balance alerts)
    @KafkaListener(topics = "account-events", groupId = "notification-service", containerFactory = "kafkaListenerContainerFactory")
    public void consumeAccountEvent(AccountEvent accountEvent) {
        System.out.println("Received Account Event: " + accountEvent);
        notificationService.processAccountEvent(accountEvent);
    }

    // Listener for transaction events (e.g., deposits, withdrawals, transfers)
    @KafkaListener(topics = "transaction-events", groupId = "notification-service", containerFactory = "kafkaListenerContainerFactory")
    public void consumeTransactionEvent(TransactionEvent transactionEvent) {
        System.out.println("Received Transaction Event: " + transactionEvent);
        notificationService.processTransactionEvent(transactionEvent);
    }
}
