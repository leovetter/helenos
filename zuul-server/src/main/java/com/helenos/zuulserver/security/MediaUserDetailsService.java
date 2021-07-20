package com.helenos.zuulserver.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.helenos.model.User;
import com.helenos.zuulserver.repository.MediaUserRepository;

@Service
public class MediaUserDetailsService implements UserDetailsService {
 
    @Autowired
    private MediaUserRepository mediaUserRepository;
 
    @Override
    public UserDetails loadUserByUsername(String email) {
        Optional<User> user = mediaUserRepository.findByEmail(email);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException(email);
        }
        return new MediaUserPrincipal(user.get());
    }
}