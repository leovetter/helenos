package com.helenos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helenos.model.User;
import com.helenos.backend.model.VerificationToken;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
 
    VerificationToken findByToken(String token);
 
    VerificationToken findByUser(User user);
}