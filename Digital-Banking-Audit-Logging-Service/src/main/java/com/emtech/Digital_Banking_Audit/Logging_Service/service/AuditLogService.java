package com.emtech.Digital_Banking_Audit.Logging_Service.service;


import com.emtech.Digital_Banking_Audit.Logging_Service.model.AuditLog;
import com.emtech.Digital_Banking_Audit.Logging_Service.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogService {
    private final AuditLogRepository auditLogRepository;

    public void logAction(String action, String userEmail, String details, String ipAddress) {
        AuditLog auditLog = AuditLog.builder()
                .action(action)
                .userEmail(userEmail)
                .details(details)
                .ipAddress(ipAddress)
                .timestamp(LocalDateTime.now())
                .build();
        auditLogRepository.save(auditLog);
    }

    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAll();
    }

    public List<AuditLog> getUserLogs(String email) {
        return auditLogRepository.findByUserEmail(email);
    }
}
