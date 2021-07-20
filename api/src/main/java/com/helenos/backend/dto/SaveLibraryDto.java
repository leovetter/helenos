package com.helenos.backend.dto;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotBlank;

public class SaveLibraryDto {
	
	private Long id;

	@NotBlank
	@NotNull
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

	public void setTitle(String title) {
		this.title = title;
	}

	public List<MediaDto> getMedias() {
		return medias;
	}

	public void setMedias(List<MediaDto> medias) {
		this.medias = medias;
	}
	
	public String toString() {
		String mediasStr = "";
		for(MediaDto mediaDto: this.medias) {
			mediasStr += "{name: " + mediaDto.getName() + ", type: " + mediaDto.getType() + "},";
		}
		return "{id: " + this.id + ", title: " + this.title + ", medias: [" + mediasStr + "]";
	}
}
