package com.helenos.backend.dto;

public class ResultDto {

	private String type;
	
	private Long idUser;
	
	private String firstName;
	
	private String lastName;
	
	private String picture;
	
	private Integer albumNumber;
	
	private String title;
	
	private String cover;
	
	private Long coverOwnerId;
	
	private Integer audioNumber;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getIdUser() {
		return idUser;
	}

	public void setIdUser(Long idUser) {
		this.idUser = idUser;
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

	public Integer getAlbumNumber() {
		return albumNumber;
	}

	public void setAlbumNumber(Integer albumNumber) {
		this.albumNumber = albumNumber;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}

	public Long getCoverOwnerId() {
		return coverOwnerId;
	}

	public void setCoverOwnerId(Long coverOwnerId) {
		this.coverOwnerId = coverOwnerId;
	}

	public Integer getAudioNumber() {
		return audioNumber;
	}

	public void setAudioNumber(Integer audioNumber) {
		this.audioNumber = audioNumber;
	}

	@Override
	public String toString() {
		return "ResultDto [type=" + type + ", firstName=" + firstName + ", lastName=" + lastName + ", picture="
				+ picture + ", title=" + title + ", cover=" + cover + "]";
	}
}
