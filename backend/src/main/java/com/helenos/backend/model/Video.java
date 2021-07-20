package com.helenos.backend.model;

import javax.persistence.Entity;

import lombok.Data;

@Data
@Entity
public class Video extends Media {
	
	
	@Override
	public String toString() {
		return super.toString();
	} 
	
	
}
