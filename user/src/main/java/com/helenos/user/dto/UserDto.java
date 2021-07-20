package com.helenos.user.dto;

import java.util.HashSet;
import java.util.Set;

import com.helenos.user.dto.LibraryDto;

public class UserDto {

	private Long id;

	private String firstName;
	
	private String lastName;

	private String email;
	
	private String picture;
	
    private Set<LibraryDto> sharedLibraries = new HashSet<>();

	private String password;

	private boolean active;

	private String roles = "";

	private String permissions = "";

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

	public Set<LibraryDto> getSharedLibraries() {
		return sharedLibraries;
	}

	public void setSharedLibraries(Set<LibraryDto> sharedLibraries) {
		this.sharedLibraries = sharedLibraries;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public String getPermissions() {
		return permissions;
	}

	public void setPermissions(String permissions) {
		this.permissions = permissions;
	}
}
