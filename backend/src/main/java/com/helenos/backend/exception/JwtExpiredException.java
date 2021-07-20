package com.helenos.backend.exception;

public class JwtExpiredException extends Exception {

	public JwtExpiredException() {
		super("Jwt token Expired");
	}
}
