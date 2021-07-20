package com.helenos.user.dto;

import javax.validation.constraints.NotNull;

public class CreateCustomerDto {
	
	@NotNull
	private String email;
	
	@NotNull
	private String payment_method;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPayment_method() {
		return payment_method;
	}

	public void setPayment_method(String payment_method) {
		this.payment_method = payment_method;
	}
}
