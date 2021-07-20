package com.helenos.backend.model;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(exclude= "users")
public class Library {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false, columnDefinition= "TIMESTAMP WITH TIME ZONE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate;
	
	@Column(nullable = false, columnDefinition= "TIMESTAMP WITH TIME ZONE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date updateDate;
	
	@Column(nullable = false)
	private Integer size;
	
	@Column(nullable = false)
	private Boolean isPublicAlbum;

	@Column(nullable = true)
	private String cover;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owned_user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User ownedUser;
	
	@ManyToMany(fetch = FetchType.LAZY,
            mappedBy = "sharedLibraries")
    private Set<User> users = new HashSet<>();
	
	@OneToMany(mappedBy = "library", cascade = CascadeType.ALL)
    private List<Media> medias;
	
	public Library() {}
	
	public Library(String title) {
		this.title = title;
	}
	
	public Library(String title, User ownedUser) {
		this.title = title;
		this.ownedUser = ownedUser;
	}
	
	public void addMedias(List<Media> medias) {
		this.medias.addAll(medias);
	}

	@Override
	public String toString() {
		return "Library [id=" + id + ", title=" + title + ", creationDate=" + creationDate + ", updateDate="
				+ updateDate + ", size=" + size + ", isPublicAlbum=" + isPublicAlbum + ", cover=" + cover + ", medias=" + medias + "]";
	}
}
