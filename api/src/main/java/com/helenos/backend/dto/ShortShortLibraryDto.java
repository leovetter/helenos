package com.helenos.backend.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotBlank;

public class ShortShortLibraryDto {
	
	@NotNull
	private Long id;

	@NotBlank
	@NotNull
    private String title;
    
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
}
