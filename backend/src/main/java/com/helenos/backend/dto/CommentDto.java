package com.helenos.backend.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CommentDto {

	@NotNull
	private Long idMedia;
	
	@NotNull
	private Long idUser;
	
	@NotBlank
	@NotNull
	private String comment;

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

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	@Override
	public String toString() {
		return "CommentDto [idMedia=" + idMedia + ", idUser=" + idUser + ", comment=" + comment + "]";
	}
}

//private Long id;
//
//private String text;
//
//private String firstName;
//
//private String lastName;
//
//private String picture;
//
//public Long getId() {
//	return id;
//}
//
//public void setId(Long id) {
//	this.id = id;
//}
//
//public String getText() {
//	return text;
//}
//
//public void setText(String text) {
//	this.text = text;
//}
//
//public String getFirstName() {
//	return firstName;
//}
//
//public void setFirstName(String firstName) {
//	this.firstName = firstName;
//}
//
//public String getLastName() {
//	return lastName;
//}
//
//public void setLastName(String lastName) {
//	this.lastName = lastName;
//}
//
//public String getPicture() {
//	return picture;
//}
//
//public void setPicture(String picture) {
//	this.picture = picture;
//}
//
//@Override
//public String toString() {
//	return "CommentDto [id=" + id + ", text=" + text + ", firstName=" + firstName + ", lastName=" + lastName
//			+ ", picture=" + picture + "]";
//}
