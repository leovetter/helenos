package com.helenos.backend.dto;

import javax.validation.constraints.NotNull;

public class CommentUserDto {
	
	@NotNull
	private Long id;
	
	private String firstName;
	
	private String lastName;
	
	private String picture;

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

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	@Override
	public String toString() {
		return "CommentUserDto [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", picture="
				+ picture + "]";
	}
}
