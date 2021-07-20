package com.helenos.backend.dto;

import java.util.List;

public class LibraryDto {
	
	private Long id;
	
	private Long ownedUserId;
	
	private String title;
    
    private List<MediaDto> medias;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public List<MediaDto> getMedias() {
		return medias;
	}

	public void setMedias(List<MediaDto> medias) {
		this.medias = medias;
	}
}
