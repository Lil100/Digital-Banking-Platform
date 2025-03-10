package com.emtech.Digital_Banking_Audit.Logging_Service.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "audit_logs")
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action;        // e.g., "Deposit", "Withdraw", "Login"
    private String userEmail;     // User who performed the action
    private String details;       // Extra details (e.g., transaction ID)
    private String ipAddress;     // Client IP address
    private LocalDateTime timestamp;
}
