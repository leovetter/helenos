package com.helenos.backend.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotBlank;

public class SaveEditLibraryDto {
	
	@NotNull
	private Long id;

	@NotBlank
	@NotNull
    private String title;
	
	private String cover;
	
	private Boolean publicAlbum;
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Boolean getPublicAlbum() {
		return publicAlbum;
	}

	public void setPublicAlbum(Boolean publicAlbum) {
		this.publicAlbum = publicAlbum;
	}

	@Override
	public String toString() {
		return "SaveEditLibraryDto [id=" + id + ", title=" + title + ", cover=" + cover + ", publicAlbum=" + publicAlbum
				+ "]";
	}
}
