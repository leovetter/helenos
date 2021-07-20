package com.helenos.backend.dto;

import javax.validation.constraints.NotNull;

public class AccountUserDto {
	
	@NotNull
	private Long id;
	
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String picture;
	
	private String cover;
	
	private String driveSocial;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}

	public String getDriveSocial() {
		return driveSocial;
	}

	public void setDriveSocial(String driveSocial) {
		this.driveSocial = driveSocial;
	}

	@Override
	public String toString() {
		return "AccountUserDto [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", picture=" + picture + "]";
	}
}
