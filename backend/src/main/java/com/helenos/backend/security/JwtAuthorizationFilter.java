package com.helenos.backend.security;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.helenos.backend.model.User;
import com.helenos.backend.repository.MediaUserRepository;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

	private MediaUserRepository mediaUserRepository;

	public JwtAuthorizationFilter(AuthenticationManager authenticationManager, MediaUserRepository userRepository) {
		super(authenticationManager);
		this.mediaUserRepository = userRepository;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// Read the Authorization header, where the JWT token should be
		String header = request.getHeader(JwtProperties.HEADER_STRING);
		// If header does not contain BEARER or is null delegate to Spring impl and exit
		if (header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
			chain.doFilter(request, response);
			return;
		}

		// If header is present, try grab user principal from database and perform
		// authorization
		Authentication authentication = getUsernamePasswordAuthentication(request);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		// Continue filter execution
		chain.doFilter(request, response);
	}

	private Authentication getUsernamePasswordAuthentication(HttpServletRequest request) {

		String token = request.getHeader(JwtProperties.HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX, "");
		
		if (token != null) {
			// parse the token and validate it
			Long idUser = Long.parseLong(JWT.require(HMAC512(JwtProperties.SECRET.getBytes())).build().verify(token).getSubject());

			// Search in the DB if we find the user by token subject (username)
			// If so, then grab user details and create spring auth token using username,
			// pass, authorities/roles
			if (idUser != null) {
				Optional<User> user = mediaUserRepository.findById(idUser);
				if (user.isPresent()) {
					MediaUserPrincipal principal = new MediaUserPrincipal(user.get());
					UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(principal, null,
							principal.getAuthorities());
					return auth;
				}
			}
			return null;
		}
		return null;
	}

}
