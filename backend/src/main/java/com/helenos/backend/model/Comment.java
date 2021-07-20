package com.helenos.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.Data;

@Data
@Entity
public class Comment {

	@Id
	@GeneratedValue 
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "media_id", nullable = false)
	private Media media;
	
	@Column(nullable = false)
	private String text;
	
	@OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;
	
	public Comment() {}

	@Override
	public String toString() {
		return "Comment [id=" + id + ", media=" + media + ", text=" + text + ", user=" + user + "]";
	}
}
