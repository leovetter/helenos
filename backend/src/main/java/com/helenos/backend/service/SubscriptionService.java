package com.helenos.backend.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpRequest.Builder;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.interfaces.ECPrivateKey;
import java.security.interfaces.ECPublicKey;
import java.security.spec.ECGenParameterSpec;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyAgreement;
import javax.crypto.Mac;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.helenos.backend.dto.Notification;
import com.helenos.backend.model.Library;
import com.helenos.backend.model.Subscription;
import com.helenos.backend.model.User;
import com.helenos.backend.repository.SubscriptionRepository;
import com.stripe.model.Application;

@Service
public class SubscriptionService {

	private final ServerKeys serverKeys;
	private final CryptoService cryptoService;
	private SubscriptionRepository subscriptionRepository;
	private final Algorithm jwtAlgorithm;
	private HttpClient httpClient;
	private final SecureRandom SECURE_RANDOM = new SecureRandom();
	private ObjectMapper objectMapper;
	private static byte[] P256_HEAD = Base64.getDecoder().decode("MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgA");
	private ECPublicKey publicKey;
	private ECPrivateKey privateKey;
	
	@Autowired
	public SubscriptionService(SubscriptionRepository subscriptionRepository, ServerKeys serverKeys, CryptoService cryptoService,
							   ObjectMapper objectMapper) {
		
		this.serverKeys = serverKeys;
		this.cryptoService = cryptoService;
		this.subscriptionRepository = subscriptionRepository;
		this.objectMapper = objectMapper;
		this.httpClient = HttpClient.newHttpClient();
		
		this.jwtAlgorithm = Algorithm.ECDSA256(this.serverKeys.getPublicKey(), this.serverKeys.getPrivateKey());
	}
	
	public void storeSubscription(Subscription sub, Long idUser) {
	
		Subscription subPresent = this.subscriptionRepository.findByEndpointAndIdUser(sub.getEndpoint(), idUser); 
		
		if(subPresent == null) {
			sub.setIdUser(idUser);
			this.subscriptionRepository.save(sub);
		}
		
	}
	
	public void sendNotification(User user, Library album) {
		
		List<Subscription> subs = this.subscriptionRepository.findAllByIdUser(user.getId());
		
		subs.forEach(sub -> {
			
			System.out.println("Subscription");
			System.out.println(sub.getEndpoint());
			
			Notification notification = new Notification("Nouvel album partagé : " + album.getTitle());
	        notification.setBody("Un nouvel album a été partagé avec vous.");
//	        notification.setIcon("assets/chuck.png");
	        
	        Object message = Map.of("notification", notification);
			
	        byte[] result = null;
			try {
				result = this.cryptoService.encrypt( this.objectMapper.writeValueAsString(message), sub.getP256dh(), sub.getAuth(), 0);
			} catch (InvalidKeyException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (NoSuchAlgorithmException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (InvalidKeySpecException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (InvalidAlgorithmParameterException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (NoSuchPaddingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (IllegalBlockSizeException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (BadPaddingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (JsonProcessingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			String origin = null;
		    try {
		      URL url = new URL(sub.getEndpoint());
		      origin = url.getProtocol() + "://" + url.getHost();
		    }
		    catch (MalformedURLException e) {
		    	e.printStackTrace();
		    }
		    
			Date today = new Date();
		    Date expires = new Date(today.getTime() + 12 * 60 * 60 * 1000);

		    String token = JWT.create().withAudience(origin).withExpiresAt(expires)
		        .withSubject("app.helenos@gmail.com").sign(this.jwtAlgorithm);
		    
		    URI endpointURI = URI.create(sub.getEndpoint());
		    
		    Builder httpRequestBuilder = HttpRequest.newBuilder();
		    
		    httpRequestBuilder.POST(BodyPublishers.ofByteArray(result))
	          .header("Content-Type", "application/octet-stream")
	          .header("Content-Encoding", "aes128gcm");
		    
		    HttpRequest request = httpRequestBuilder.uri(endpointURI).header("TTL", "180")
		            .header("Authorization",
		                "vapid t=" + token + ", k=" + this.serverKeys.getPublicKeyBase64())
		            .build();
		    
		    try {
		        HttpResponse<Void> response = this.httpClient.send(request,
		            BodyHandlers.discarding());

		        switch (response.statusCode()) {
		        case 201:
		          System.out.println("Push message successfully sent: " +
		              sub.getEndpoint());
		          break;
		        case 404:
		        case 410:
		        	System.out.println("Subscription not found or gone :" +
		              sub.getEndpoint());
		          // remove subscription from our collection of subscriptions
		        case 429:
		        	System.out.println("Too many requests: " + request);
		          break;
		        case 400:
		        	System.out.println("Invalid request: " + request);
		          break;
		        case 413:
		        	System.out.println("Payload size too large: " + request);
		          break;
		        default:
		        	System.out.println("Unhandled status code: " + response.statusCode() + " " +
		              request);
		        }
		      }
		      catch (IOException | InterruptedException e) {
		    	  System.out.println("send push message" + e);
		      }

		});
		
	}
	
}
