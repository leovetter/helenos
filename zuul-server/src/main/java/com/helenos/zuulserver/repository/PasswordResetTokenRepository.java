package com.helenos.zuulserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helenos.zuulserver.model.PasswordResetToken;
import com.helenos.model.User;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
 
	PasswordResetToken findByToken(String token);
 
	PasswordResetToken findByUser(User user);
}
