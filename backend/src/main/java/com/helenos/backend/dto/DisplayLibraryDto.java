package com.helenos.backend.dto;

import java.util.Date;

public class DisplayLibraryDto {
	
	private Long id;
	
	private Long ownedUserId;
	     
    private String title;
    
    private Integer size;
    
    private Date creationDate;
    
    private Date updateDate;
    
    private String cover;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getOwnedUserId() {
		return ownedUserId;
	}

	public void setOwnedUserId(Long ownedUserId) {
		this.ownedUserId = ownedUserId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}
}
