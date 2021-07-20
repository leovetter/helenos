package com.helenos.user;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import com.helenos.model.User;
import com.helenos.user.dto.UpdatePasswordDto;

@ComponentScan({"com.helenos.user", "com.helenos.model"})
@SpringBootApplication
@EnableEurekaClient
public class UserApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(UserApplication.class, args);
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(UserApplication.class);
	}
	
	@Bean
	public ModelMapper modelMapper() { 
		ModelMapper mm = new ModelMapper();
		PropertyMap<UpdatePasswordDto, User> propertyMap = new PropertyMap<UpdatePasswordDto, User> (){
	        protected void configure() {
	            map(source.getNewPassword()).setPassword(null);;
	        }
	    };

	    mm.addMappings(propertyMap);
		return mm;
	}
	
	@Bean
	PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
	
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
