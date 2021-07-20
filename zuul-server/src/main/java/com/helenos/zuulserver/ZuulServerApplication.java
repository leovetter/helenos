package com.helenos.zuulserver;

import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.tomcat.jni.SSLContext;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.client.RestTemplate;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@ComponentScan({"com.helenos.model", "com.helenos.zuulserver"})
@SpringBootApplication
@EnableEurekaClient
@EnableZuulProxy
public class ZuulServerApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(ZuulServerApplication.class, args);
	}
	
	@Bean
	public ModelMapper modelMapper() { return new ModelMapper(); }
	
	@Bean
	public JavaMailSenderImpl javaMailSenderImpl() { return new JavaMailSenderImpl(); }
	
	@Configuration
	class RestTemplateConfig {
		
		// Create a bean for restTemplate to call services
		@Bean
		@LoadBalanced		// Load balance between service instances running at different ports.
		public RestTemplate restTemplate() {
		    return new RestTemplate();
		}
	}
}
