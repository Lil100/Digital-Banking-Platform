package com.emtech.Digital_Banking_Notification_Service.repository;


import com.emtech.Digital_Banking_Notification_Service.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
}