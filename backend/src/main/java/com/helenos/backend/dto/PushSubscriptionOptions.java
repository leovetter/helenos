package com.helenos.backend.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class PushSubscriptionOptions {

	@NotBlank
	@NotNull
	private String auth;
	
	@NotBlank
	@NotNull
	private String p256dh;

	public String getAuth() {
		return auth;
	}

	public void setAuth(String auth) {
		this.auth = auth;
	}

	public String getP256dh() {
		return p256dh;
	}

	public void setP256dh(String p256dh) {
		this.p256dh = p256dh;
	}

	@Override
	public String toString() {
		return "PushSubscriptionOptions [auth=" + auth + ", p256dh=" + p256dh + "]";
	}
}
