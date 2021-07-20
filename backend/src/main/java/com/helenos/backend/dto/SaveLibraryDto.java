package com.helenos.backend.dto;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotBlank;

public class SaveLibraryDto {
	
	private Long id;

	@NotBlank
	@NotNull
	private String title;
	
	private String cover;
    
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

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}

	public List<MediaDto> getMedias() {
		return medias;
	}

	public void setMedias(List<MediaDto> medias) {
		this.medias = medias;
	}

	@Override
	public String toString() {
		return "SaveLibraryDto [id=" + id + ", title=" + title + ", cover=" + cover + ", medias=" + medias + "]";
	}
}
