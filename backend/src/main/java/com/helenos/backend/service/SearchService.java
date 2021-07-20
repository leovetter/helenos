package com.helenos.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.helenos.backend.model.Library;
import com.helenos.backend.model.User;
import com.helenos.backend.repository.LibraryRepository;
import com.helenos.backend.repository.MediaUserRepository;

@Service
public class SearchService {

	@Autowired
	private MediaUserRepository mediaUserRepository;
	@Autowired
	private LibraryRepository libraryRepository;
	
	public List<User> searchUser(String searchApp, User principalUser) {
		
		List<User> users = this.mediaUserRepository.findByFirstNameIgnoreCaseLikeOrLastNameIgnoreCaseLike("%" + searchApp + "%", "%" + searchApp + "%");
		for(User user: users) {
			if(user.getId() == principalUser.getId() ) {
				users.remove(user);
			}
		}
		
		return users;
	}
	
	public List<Library> searchAlbums(String searchApp, User principalUser) {
		
		List<Library> albums = this.libraryRepository.findByTitleIgnoreCaseLike("%" + searchApp + "%");
		for(Library album: albums) {
			if(principalUser.getId() == album.getOwnedUser().getId() ) {
				albums.remove(album);
			}
		}
		
		return albums;
	}
	
	public Integer findPublicAlbumsNumber(User user) {
		
		List<Library> libraries = this.libraryRepository.findByOwnedUserAndIsPublicAlbum(user, true);
		return libraries.size();
	}
}
