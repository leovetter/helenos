package com.helenos.media;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan({"com.helenos.media", "com.helenos.model"})
@SpringBootApplication
@EnableEurekaClient
public class MediaApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(MediaApplication.class, args);
	}
	
	@Bean
	public ModelMapper modelMapper() { return new ModelMapper(); }
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(MediaApplication.class);
	}
}
