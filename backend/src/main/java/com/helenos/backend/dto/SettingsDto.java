package com.helenos.backend.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class SettingsDto {

	@NotBlank
	@NotNull
	private String driveSocial;
	
	public String getDriveSocial() {
		return driveSocial;
	}

	public void setDriveSocial(String driveSocial) {
		this.driveSocial = driveSocial;
	}
}
