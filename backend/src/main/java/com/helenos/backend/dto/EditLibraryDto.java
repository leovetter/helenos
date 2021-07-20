package com.helenos.backend.dto;

import java.util.List;

public class EditLibraryDto {
	
	private Long id;
	
	private boolean isPublicAlbum;
	
	private String cover;
	
	private Long ownedUserId;
	
	private String title;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isPublicAlbum() {
		return isPublicAlbum;
	}

	public void setPublicAlbum(boolean isPublicAlbum) {
		this.isPublicAlbum = isPublicAlbum;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}

	public String getTitle() {
		return title;
	}

	public Long getOwnedUserId() {
		return ownedUserId;
	}

	public void setOwnedUserId(Long ownedUserId) {
		this.ownedUserId = ownedUserId;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public String toString() {
		return "EditLibraryDto [id=" + id + ", isPublicAlbum=" + isPublicAlbum + ", cover=" + cover + ", ownedUserId="
				+ ownedUserId + ", title=" + title + "]";
	}
}
