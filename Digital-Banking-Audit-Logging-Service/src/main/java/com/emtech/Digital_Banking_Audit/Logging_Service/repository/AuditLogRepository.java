package com.emtech.Digital_Banking_Audit.Logging_Service.repository;


import com.emtech.Digital_Banking_Audit.Logging_Service.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByUserEmail(String email);
}
