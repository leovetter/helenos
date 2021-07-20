package com.helenos.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties("subscription")
@Component
public class SubscriptionProperties {

	@Value("${helenos.public-key-path}")
	private String serverPublicKeyPath;
	@Value("${helenos.private-key-path}")
	private String serverPrivateKeyPath;

	public String getServerPublicKeyPath() {
		return this.serverPublicKeyPath;
	}

	public void setServerPublicKeyPath(String serverPublicKeyPath) {
		this.serverPublicKeyPath = serverPublicKeyPath;
	}

	public String getServerPrivateKeyPath() {
		return this.serverPrivateKeyPath;
	}

	public void setServerPrivateKeyPath(String serverPrivateKeyPath) {
		this.serverPrivateKeyPath = serverPrivateKeyPath;
	}

}
