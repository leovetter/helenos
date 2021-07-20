package com.helenos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helenos.backend.model.Settings;
import com.helenos.backend.model.User;

public interface SettingsRepository extends JpaRepository<Settings, Long> {

	Settings findByUser(User user);
}
