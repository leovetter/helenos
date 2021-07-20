package com.helenos.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.KeyPair;
import java.security.interfaces.ECPrivateKey;
import java.security.interfaces.ECPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;

@Component
public class ServerKeys {

  private final SubscriptionProperties subscriptionProperties;

  private ECPublicKey publicKey;

  private byte[] publicKeyUncompressed;

  private String publicKeyBase64;

  private ECPrivateKey privateKey;

  private final CryptoService cryptoService;

  public ServerKeys(SubscriptionProperties subscriptionProperties, CryptoService cryptoService) {
    this.subscriptionProperties = subscriptionProperties;
    this.cryptoService = cryptoService;
  }

  public byte[] getPublicKeyUncompressed() {
    return this.publicKeyUncompressed;
  }

  public String getPublicKeyBase64() {
    return this.publicKeyBase64;
  }

  public ECPrivateKey getPrivateKey() {
    return this.privateKey;
  }

  public ECPublicKey getPublicKey() {
    return this.publicKey;
  }

  @PostConstruct
  private void initKeys() {
    Path appServerPublicKeyFile = Paths.get(this.subscriptionProperties.getServerPublicKeyPath());
    Path appServerPrivateKeyFile = Paths
        .get(this.subscriptionProperties.getServerPrivateKeyPath());

    if (Files.exists(appServerPublicKeyFile) && Files.exists(appServerPrivateKeyFile)) {
      try {
        byte[] appServerPublicKey = Files.readAllBytes(appServerPublicKeyFile);
        byte[] appServerPrivateKey = Files.readAllBytes(appServerPrivateKeyFile);

        this.publicKey = (ECPublicKey) this.cryptoService
            .convertX509ToECPublicKey(appServerPublicKey);
        this.privateKey = (ECPrivateKey) this.cryptoService
            .convertPKCS8ToECPrivateKey(appServerPrivateKey);

        this.publicKeyUncompressed = CryptoService
            .toUncompressedECPublicKey(this.publicKey);

        this.publicKeyBase64 = Base64.getUrlEncoder().withoutPadding()
            .encodeToString(this.publicKeyUncompressed);
      }
      catch (IOException | InvalidKeySpecException e) {
        System.out.println("read files" + e);
      }
    }
    else {
      try {
        KeyPair pair = this.cryptoService.getKeyPairGenerator().generateKeyPair();
        this.publicKey = (ECPublicKey) pair.getPublic();
        this.privateKey = (ECPrivateKey) pair.getPrivate();
        Files.write(appServerPublicKeyFile, this.publicKey.getEncoded());
        Files.write(appServerPrivateKeyFile, this.privateKey.getEncoded());

        this.publicKeyUncompressed = CryptoService
            .toUncompressedECPublicKey(this.publicKey);

        this.publicKeyBase64 = Base64.getUrlEncoder().withoutPadding()
            .encodeToString(this.publicKeyUncompressed);
      }
      catch (IOException e) {
    	  System.out.println("write files" + e);
      }
    }

  }

}