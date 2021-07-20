package com.helenos.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class RestConfig {

    @Value("${helenos.host}")
    private String host;
	
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://" + host);
        config.addAllowedOrigin("http://" + host + ":4200");
        config.addAllowedOrigin("https://" + host + ":4200");
        config.addAllowedOrigin("http://" + host + ":80");
        config.addAllowedOrigin("http://" + host + ":8080");
        config.addAllowedOrigin("http://" + host + ":8762");
        config.addAllowedOrigin("http://" + host + ":443");
        config.addAllowedOrigin("https://" + host);
        config.addAllowedOrigin("https://" + host + ":80");
        config.addAllowedOrigin("https://" + host + ":8080");
        config.addAllowedOrigin("https://" + host + ":8762");
        config.addAllowedOrigin("https://" + host + ":443");
        config.addAllowedOrigin("http://" + host);
        config.addAllowedOrigin("http://" + "helenos.tech");
        config.addAllowedOrigin("http://" + "helenos.tech" + ":4200");
        config.addAllowedOrigin("https://" + "helenos.tech" + ":4200");
        config.addAllowedOrigin("http://" + "helenos.tech" + ":80");
        config.addAllowedOrigin("http://" + "helenos.tech" + ":8080");
        config.addAllowedOrigin("http://" + "helenos.tech" + ":8762");
        config.addAllowedOrigin("http://" + "helenos.tech" + ":443");
        config.addAllowedOrigin("https://" + "helenos.tech");
        config.addAllowedOrigin("https://" + "helenos.tech" + ":80");
        config.addAllowedOrigin("https://" + "helenos.tech" + ":8080");
        config.addAllowedOrigin("https://" + "helenos.tech" + ":8762");
        config.addAllowedOrigin("https://" + "helenos.tech" + ":443");
        config.addAllowedHeader("*");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}