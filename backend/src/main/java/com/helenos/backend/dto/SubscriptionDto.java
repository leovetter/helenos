package com.helenos.backend.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class SubscriptionDto {

	@NotBlank
	@NotNull
	private String endpoint;
	
	private Integer expirationTime;
	
	private PushSubscriptionOptions keys;

	public String getEndpoint() {
		return endpoint;
	}

	public void setEndpoint(String endpoint) {
		this.endpoint = endpoint;
	}

	public Integer getExpirationTime() {
		return expirationTime;
	}

	public void setExpirationTime(Integer expirationTime) {
		this.expirationTime = expirationTime;
	}

	public PushSubscriptionOptions getKeys() {
		return keys;
	}

	public void setKeys(PushSubscriptionOptions keys) {
		this.keys = keys;
	}

	@Override
	public String toString() {
		return "SubscriptionDto [endpoint=" + endpoint + ", expirationTime=" + expirationTime + ", keys=" + keys + "]";
	}
}
