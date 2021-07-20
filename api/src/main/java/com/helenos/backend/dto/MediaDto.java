package com.helenos.backend.dto;

import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotBlank;

public class MediaDto {
	
	@NotNull
	private Long id;
	
	@NotBlank
	@NotNull
	private String path;
	
	@NotBlank
	@NotNull
	private String name;
	
	@NotBlank
	@NotNull
	private Integer size;
	
	@NotBlank
	@NotNull
	private Date creationDate;
    
	@NotBlank
	@NotNull
    private Date updateDate;
	
	@NotBlank
	@NotNull
    private String type;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Integer getSize() {
		return size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
