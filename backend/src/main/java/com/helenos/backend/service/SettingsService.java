package com.helenos.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.helenos.backend.model.Settings;
import com.helenos.backend.model.User;
import com.helenos.backend.repository.SettingsRepository;

@Service
public class SettingsService {

	@Autowired
	private SettingsRepository settingsRepository;
	
	public Settings findByUser(User user) {
		
		Settings settings = this.settingsRepository.findByUser(user);
		
		return settings;
	}
}
