package com.helenos.backend.dto;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class MediaCommentsDto {
	
	private Long id;
	
	private String type;
	
	private String path;
	
	private String name;
	
	private String picture;
	
	private String libraryTitle;
	
	private Long ownerId;
	
	private List<CommentDto> comments;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLibraryTitle() {
		return libraryTitle;
	}

	public void setLibraryTitle(String libraryTitle) {
		this.libraryTitle = libraryTitle;
	}

	public Long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}

	public List<CommentDto> getComments() {
		return comments;
	}

	public void setComments(List<CommentDto> comments) {
		this.comments = comments;
	}

	@Override
	public String toString() {
		return "MediaCommentsDto [id=" + id + ", type=" + type + ", path=" + path + ", name=" + name + ", libraryTitle="
				+ libraryTitle + ", ownerId=" + ownerId + ", comments=" + comments + "]";
	}
}
