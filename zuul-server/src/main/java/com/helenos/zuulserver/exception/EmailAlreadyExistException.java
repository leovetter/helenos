package com.helenos.zuulserver.exception;

public class EmailAlreadyExistException extends RuntimeException {
	
	public EmailAlreadyExistException() {
		super("Email already exists");
	}
}
