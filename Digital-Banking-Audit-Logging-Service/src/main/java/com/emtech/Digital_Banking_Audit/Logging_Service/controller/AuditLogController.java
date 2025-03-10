package com.emtech.Digital_Banking_Audit.Logging_Service.controller;


import com.emtech.Digital_Banking_Audit.Logging_Service.model.AuditLog;
import com.emtech.Digital_Banking_Audit.Logging_Service.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
@RequiredArgsConstructor
public class AuditLogController {
    private final AuditLogService auditLogService;

    // Log an action
    @PostMapping("/log")
    public ResponseEntity<String> logAction(@RequestBody AuditLog auditLog) {
        auditLogService.logAction(
                auditLog.getAction(),
                auditLog.getUserEmail(),
                auditLog.getDetails(),
                auditLog.getIpAddress()
        );
        return ResponseEntity.ok("Log saved successfully");
    }

    // Get all logs (Admins only)
    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<AuditLog>> getAllLogs() {
        return ResponseEntity.ok(auditLogService.getAllLogs());
    }

    // Get user logs (Admins only)
    @GetMapping("/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<AuditLog>> getUserLogs(@PathVariable String email) {
        return ResponseEntity.ok(auditLogService.getUserLogs(email));
    }
}