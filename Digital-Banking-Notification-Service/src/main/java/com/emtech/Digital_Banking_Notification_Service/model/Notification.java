package com.emtech.Digital_Banking_Notification_Service.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String recipientEmail;
    private String phone;
    private String subject;

    @Column(columnDefinition = "TEXT") // Allows longer messages
    private String message;

    private boolean sent;

    private LocalDateTime createdAt = LocalDateTime.now(); // Auto-set timestamp
    private LocalDateTime sentAt;

    public void setSent(boolean sent) {
        this.sent = sent;
        if (sent) {
            this.sentAt = LocalDateTime.now();
        }
    }
}
