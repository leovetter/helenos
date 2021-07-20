package com.helenos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helenos.backend.model.PasswordResetToken;
import com.helenos.backend.model.User;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
 
	PasswordResetToken findByToken(String token);
 
	PasswordResetToken findByUser(User user);
}
