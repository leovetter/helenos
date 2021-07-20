package com.helenos.zuulserver.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class NewPasswordDto {

	@NotBlank
	@NotNull
	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
