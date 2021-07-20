package com.helenos.backend.exception;

public class EmailAlreadyExistException extends RuntimeException {
	
	public EmailAlreadyExistException() {
		super("Email already exists");
	}
}
