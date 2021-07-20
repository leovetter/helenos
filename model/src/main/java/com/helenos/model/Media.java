package com.helenos.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.InheritanceType;

@Data
@Entity
@EqualsAndHashCode(exclude= "library")
@Inheritance(strategy=InheritanceType.SINGLE_TABLE) 
public abstract class Media {

	@Id
	@GeneratedValue 
	private Long id;
	
	@Column(nullable = false)
	private String path;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false, columnDefinition= "TIMESTAMP WITH TIME ZONE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate;
	
	@Column(nullable = false, columnDefinition= "TIMESTAMP WITH TIME ZONE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date updateDate;
	
	@Column(nullable = false)
	private Integer size;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "library_id", nullable = false)
    @JsonIgnore
    private Library library;
	
	public Media() {}
	
	public Media(String name) {
		this.name = name;
	}
	
	public Media(String name, Library library) {
	  this.name = name;
	  this.library = library;
	}
	
	@PrePersist
    public void onPrePersist() {
        this.creationDate = new Date();
        this.updateDate = new Date();
    }
	
	@PreUpdate
    public void onPreUpdate() {
		Date updateDate = new Date();
        this.updateDate = updateDate;
    }

	@Override
	public String toString() {
		return "Media [id=" + id + ", path=" + path + ", name=" + name + ", creationDate=" + creationDate
				+ ", updateDate=" + updateDate + ", size=" + size + "]";
	}
}
