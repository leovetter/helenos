package com.helenos.backend.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class UpdatePasswordDto {
	
	@NotNull
	private Long id;

	@NotNull
	@NotBlank
	private String oldPassword;
	
	@NotNull
	@NotBlank
	private String newPassword;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	@Override
	public String toString() {
		return "UpdatePasswordDto [id=" + id + ", oldPassword=" + oldPassword + ", newPassword=" + newPassword + "]";
	}
}
