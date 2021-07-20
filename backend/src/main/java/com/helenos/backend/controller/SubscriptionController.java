package com.helenos.backend.controller;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.helenos.backend.dto.SubscriptionDto;
import com.helenos.backend.model.Subscription;
import com.helenos.backend.service.ServerKeys;
import com.helenos.backend.service.SubscriptionService;

@RestController
@RequestMapping("media")
public class SubscriptionController {

	private SubscriptionService subscriptionService;
	private ModelMapper modelMapper;
	private ServerKeys serverKeys;
	
	@Autowired
	public SubscriptionController(SubscriptionService subscriptionService, ModelMapper modelMapper,
								  ServerKeys serverKeys) {
		this.subscriptionService = subscriptionService;
		this.modelMapper = modelMapper;
		this.serverKeys = serverKeys;
	}
	
	@PostMapping("/subscriptions/{idUser}")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	public void subscriptions(@RequestBody @Valid SubscriptionDto subscriptionDto, @PathVariable Long idUser) {
		
		Subscription sub = this.modelMapper.map(subscriptionDto, Subscription.class);
		sub.setP256dh(subscriptionDto.getKeys().getP256dh());
		sub.setAuth(subscriptionDto.getKeys().getAuth());
		this.subscriptionService.storeSubscription(sub, idUser);
	}
	
	@GetMapping(path = "/publicSigningKey", produces = "application/octet-stream")
	public byte[] publicSigningKey() {
		return this.serverKeys.getPublicKeyUncompressed();
	}
}
