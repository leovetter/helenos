package com.helenos.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.helenos.backend.exception.CustomAuthenticationEntryPoint;
import com.helenos.backend.repository.MediaUserRepository;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
	
	private MediaUserDetailsService mediaUserDetailsService;
	private MediaUserRepository mediaUserRepository;
	
	public SpringSecurityConfig(MediaUserDetailsService mediaUserDetailsService, MediaUserRepository userRepository) {
		this.mediaUserDetailsService = mediaUserDetailsService;
		this.mediaUserRepository = userRepository;
	}
	
	@Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticationProvider());
	}
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http
			//enable cors
			.cors()
			.and()
	        // remove csrf and state in session because in jwt we do not need them
	        .csrf().disable()
	        .authorizeRequests()
	        .anyRequest().authenticated()
	        .and()
	        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        .and()
	        .addFilter(new JwtAuthenticationFilter(authenticationManager()))
	        .addFilter(new JwtAuthorizationFilter(authenticationManager(),  this.mediaUserRepository))
	        .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint());
    }
	
	@Override
	public void configure(WebSecurity web) {
		web.ignoring().antMatchers("/api/error");
		web.ignoring().antMatchers("/api/register");
		web.ignoring().antMatchers("/api/registrationConfirm");
		web.ignoring().antMatchers("/api/forgottenPassword");
		web.ignoring().antMatchers("/api/resetPassword");
		web.ignoring().antMatchers("/error");
		web.ignoring().antMatchers("/register");
		web.ignoring().antMatchers("/registrationConfirm");
		web.ignoring().antMatchers("/forgottenPassword");
		web.ignoring().antMatchers("/resetPassword");
	}
	
	@Bean
	DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
		daoAuthenticationProvider.setUserDetailsService(this.mediaUserDetailsService);
		
		return daoAuthenticationProvider;
	}
	
	@Bean
	PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
}