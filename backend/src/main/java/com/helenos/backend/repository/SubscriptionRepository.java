package com.helenos.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helenos.backend.model.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

	Subscription findByEndpointAndIdUser(String endpoint, Long idUser);
	
	List<Subscription> findAllByIdUser(Long idUser);
}
