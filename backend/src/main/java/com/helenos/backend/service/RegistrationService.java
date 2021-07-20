package com.helenos.backend.service;

import java.util.Arrays;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.helenos.backend.model.PasswordResetToken;
import com.helenos.backend.model.Settings;
import com.helenos.backend.model.User;
import com.helenos.backend.model.VerificationToken;
import com.helenos.backend.repository.MediaUserRepository;
import com.helenos.backend.repository.PasswordResetTokenRepository;
import com.helenos.backend.repository.SettingsRepository;
import com.helenos.backend.repository.VerificationTokenRepository;

@Service
public class RegistrationService {

	@Autowired
	private MediaUserRepository mediaUserRepository;
	@Autowired
	private SettingsRepository settingsRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
    private VerificationTokenRepository verificationTokenRepository;
	@Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
	
	public User register(User user, Settings settings) throws DataIntegrityViolationException {
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		user.setRoles("USER");
		user.setPermissions("USER");
		user.setActive(false);
		User registeredUser = null;
		
		User newUser = registeredUser = mediaUserRepository.save(user);
		
		settings.setUser(newUser);
		this.settingsRepository.save(settings);
		
		return registeredUser;
	}
	
	public VerificationToken getVerificationToken(String VerificationToken) {
        return verificationTokenRepository.findByToken(VerificationToken);
    }
	
    public void createVerificationToken(User user, String token) {
        VerificationToken myToken = new VerificationToken(token, user);
        verificationTokenRepository.save(myToken);
    }

	public void saveRegisteredUser(User user) {
		mediaUserRepository.save(user);
	}
	
	public void createPasswordResetTokenForUser(User user, String token) {
	    PasswordResetToken myToken = new PasswordResetToken(token, user);
	    passwordResetTokenRepository.save(myToken);
	}
	
	public String validatePasswordResetToken(long id, String token) {
	    PasswordResetToken passToken = passwordResetTokenRepository.findByToken(token);
	    if ((passToken == null) || (passToken.getUser().getId() != id)) {
	        return "The token is invalid";
	    }
	 
	    Calendar cal = Calendar.getInstance();
	    if ((passToken.getExpiryDate()
	        .getTime() - cal.getTime()
	        .getTime()) <= 0) {
	        return "The token has expired";
	    }
	 
	    User user = passToken.getUser();
	    Authentication auth = new UsernamePasswordAuthenticationToken(
	      user, null, Arrays.asList(
	      new SimpleGrantedAuthority("CHANGE_PASSWORD_PRIVILEGE")));
	    SecurityContextHolder.getContext().setAuthentication(auth);
	    return null;
	}
	
	public void changeUserPassword(User user, String password) {
	    user.setPassword(passwordEncoder.encode(password));
	    mediaUserRepository.save(user);
	}
}
