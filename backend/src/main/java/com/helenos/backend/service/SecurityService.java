package com.helenos.backend.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.helenos.backend.model.Library;
import com.helenos.backend.model.User;
import com.helenos.backend.security.MediaUserPrincipal;

@Service
public class SecurityService {

	@Autowired
	private LibraryService libraryService;
	
	public boolean canAccessAlbum(MediaUserPrincipal principal, Long idAlbum) {
		User user = principal.getUser();
		Library library = this.libraryService.findById(idAlbum);
		if(library.getOwnedUser().getId() == user.getId()) {
			return true;
		} else if(library.getIsPublicAlbum()) {
			return true;
		} else {
			Set<User> sharedUsers = library.getUsers();
			for(User sharedUser: sharedUsers) {
				if (sharedUser.getId() == user.getId()) {
					return true;
				}
			}
		}
		return false;
	}
}
