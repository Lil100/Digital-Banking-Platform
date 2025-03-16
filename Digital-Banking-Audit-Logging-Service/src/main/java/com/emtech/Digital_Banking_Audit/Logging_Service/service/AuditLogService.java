package com.emtech.Digital_Banking_Audit.Logging_Service.service;

import com.emtech.Digital_Banking_Audit.Logging_Service.dto.AuditLogRequest;
import com.emtech.Digital_Banking_Audit.Logging_Service.model.AuditLog;
import com.emtech.Digital_Banking_Audit.Logging_Service.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j // Enables logging
@Service
@RequiredArgsConstructor
public class AuditLogService {
    private final AuditLogRepository auditLogRepository;

    /**
     * Logs a user action into the audit log repository.
     *
     * @param action   Action performed (e.g., "LOGIN", "TRANSFER")
     * @param userEmail User performing the action
     * @param details  Additional information about the action
     * @param ipAddress IP address of the user
     */
    public void logAction(String action, String userEmail, String details, String ipAddress) {
        if (action == null || userEmail == null || details == null || ipAddress == null) {
            log.warn("Attempted to log an action with missing details. Skipping...");
            return;
        }

        AuditLog auditLog = AuditLog.builder()
                .action(action)
                .userEmail(userEmail)
                .details(details)
                .ipAddress(ipAddress)
                .timestamp(LocalDateTime.now())
                .build();

        auditLogRepository.save(auditLog);
        log.info("User action logged successfully: {}", action);
    }

    /**
     * Saves a transaction-related audit log.
     *
     * @param request The audit log request containing transaction details.
     */
    public void saveTransactionAuditLog(AuditLogRequest request) {
        if (request == null) {
            log.error("Received a null audit log request. Skipping save operation.");
            return;
        }

        AuditLog logEntry = new AuditLog();
        logEntry.setAction(request.getAction()); // Fixed incorrect method call
        logEntry.setTransactionId(request.getTransactionId());
        logEntry.setAccountId(request.getAccountId());
        logEntry.setAmount(request.getAmount());
        logEntry.setStatus(request.getStatus());
        logEntry.setTimestamp(LocalDateTime.now());

        auditLogRepository.save(logEntry);
        log.info("Transaction audit log saved successfully: {}", request.getTransactionId());
    }

    /**
     * Retrieves all audit logs from the database.
     *
     * @return List of all audit logs.
     */
    public List<AuditLog> getAllLogs() {
        List<AuditLog> logs = auditLogRepository.findAll();
        log.info("Retrieved {} audit logs.", logs.size());
        return logs;
    }

    /**
     * Retrieves audit logs for a specific user.
     *
     * @param email User's email address
     * @return List of audit logs for the given user.
     */
    public List<AuditLog> getUserLogs(String email) {
        if (email == null || email.isEmpty()) {
            log.warn("Attempted to retrieve logs with a null or empty email.");
            return List.of();
        }

        List<AuditLog> userLogs = auditLogRepository.findByUserEmail(email);
        log.info("Retrieved {} logs for user: {}", userLogs.size(), email);
        return userLogs;
    }

    /**
     * Retrieves a specific audit log by its ID.
     *
     * @param id Audit log ID
     * @return The audit log entry, if found.
     */
    public Optional<AuditLog> getAuditLogById(Long id) {
        if (id == null) {
            log.warn("Audit log ID is null. Returning empty result.");
            return Optional.empty();
        }

        Optional<AuditLog> logEntry = auditLogRepository.findById(id);
        if (logEntry.isPresent()) {
            log.info("Audit log found for ID: {}", id);
        } else {
            log.warn("No audit log found for ID: {}", id);
        }

        return logEntry;
    }
}
