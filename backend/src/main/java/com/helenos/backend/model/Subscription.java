package com.helenos.backend.model;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Subscription {

	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false)
	private String endpoint;
	
	@Column(nullable = true)
	private Integer expirationTime;
	
	@Column(nullable = false)
	private String p256dh;
	
	@Column(nullable = false)
	private String auth;
	
	@Column(nullable = false)
	private Long idUser;

	@Override
	public String toString() {
		return "Subscription [id=" + id + ", endpoint=" + endpoint + ", expirationTime=" + expirationTime + ", p256dh="
				+ p256dh + ", auth=" + auth + ", idUser=" + idUser + "]";
	}
}
