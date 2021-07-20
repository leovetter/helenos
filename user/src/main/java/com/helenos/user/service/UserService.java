package com.helenos.user.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.helenos.model.User;
import com.helenos.user.repository.MediaUserRepository;

@Service
public class UserService {

	@Autowired
	private MediaUserRepository mediaUserRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User save(User user) {
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		user.setRoles("USER");
		user.setPermissions("USER");
		user.setActive(false);
		return this.mediaUserRepository.save(user);
	}
	
	public void savePassword(User user) {
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		this.mediaUserRepository.save(user);
	}
	
	public boolean checkPassword(Long idUser, String password) {
		
		Optional<User> optUser = mediaUserRepository.findById(idUser);
		if(optUser.isPresent()) {
			if(passwordEncoder.matches(password, optUser.get().getPassword())) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	public List<User> getAll() {
		
		return this.mediaUserRepository.findFirst10ByOrderByFirstNameAsc();
	}
	
	public List<User> findUsers(String searchTerm, Long idUser) {
		
		String[] searchTerms = searchTerm.split(" ");
		ArrayList<List<User>> results = new ArrayList<List<User>>();
		
		for (int i = 0; i < searchTerms.length; i++) {
			results.add(this.mediaUserRepository.findUsers(searchTerms[i], idUser));
		}
		
		Set<User> finalResultSet = new HashSet<User>(results.get(0));
		for (int i = 1; i < results.size(); i++) {
			finalResultSet.retainAll(results.get(i));
		}
		
		List<User> finalResult = new ArrayList<User>();
		finalResult.addAll(finalResultSet);
		
		Collections.sort(finalResult, new Comparator<User>() {
			@Override
			public int compare(User user1, User user2) {
				return user1.getFirstName().compareTo(user2.getFirstName());
			}
        });
		
		return finalResult;
	}
	
	public List<User> saveSharedUsers(List<User> sharedUsers) {
		
		List<User> users = new ArrayList<User>();
		for(User sharedUser: sharedUsers) {
			
			Optional<User> user = this.mediaUserRepository.findById(sharedUser.getId());
			if (user.isPresent()) {
				
				user.get().addSharedLibrary(sharedUser.getSharedLibraries().iterator().next());
				users.add(user.get());
			}
		}
		return this.mediaUserRepository.saveAll(users);
	}
	
	public User saveAccountUser(User user) {
		return this.mediaUserRepository.save(user);
	}
	
	public User findById(Long idUser) {
		Optional<User> user = this.mediaUserRepository.findById(idUser);
		if (user.isPresent()) {
			return user.get();
		} else {
			return null;
		}
	}
	
	public User findByEmail(String email) {
		Optional<User> user = this.mediaUserRepository.findByEmail(email);
		if (user.isPresent()) {
			return user.get();
		} else {
			return null;
		}
	}
}
