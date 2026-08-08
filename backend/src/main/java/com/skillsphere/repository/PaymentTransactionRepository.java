package com.skillsphere.repository;

import com.skillsphere.model.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long> {
    List<PaymentTransaction> findByPaymentStatus(String paymentStatus);
    List<PaymentTransaction> findByCourseName(String courseName);
    List<PaymentTransaction> findAllByOrderByTransactionDateDesc();
}
