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
	
	@NotBlank
	@NotNull
    private Integer order;
	
	@NotBlank
	@NotNull
    private Boolean fromApi;
	
    private String api;
    
    private String cover;
	
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
	
	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}

	public Boolean getFromApi() {
		return fromApi;
	}

	public void setFromApi(Boolean fromApi) {
		this.fromApi = fromApi;
	}

	public String getApi() {
		return api;
	}

	public void setApi(String api) {
		this.api = api;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}
}
