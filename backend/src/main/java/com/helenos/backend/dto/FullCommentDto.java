package com.helenos.backend.dto;

public class FullCommentDto {

	private Long id;
	
	private Long idMedia;
	
	private Long idUser;
	
	private String text;
	
	private String lastName;
	
	private String firstName;
	
	private String picture;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdMedia() {
		return idMedia;
	}

	public void setIdMedia(Long idMedia) {
		this.idMedia = idMedia;
	}

	public Long getIdUser() {
		return idUser;
	}

	public void setIdUser(Long idUser) {
		this.idUser = idUser;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	@Override
	public String toString() {
		return "FullCommentDto [id=" + id + ", idMedia=" + idMedia + ", idUser=" + idUser + ", text=" + text
				+ ", lastName=" + lastName + ", firstName=" + firstName + ", picture=" + picture + "]";
	}
}
