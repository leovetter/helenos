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
    	System.out.println("cors filter");
    	System.out.println(this.host);
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