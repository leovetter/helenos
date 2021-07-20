package com.helenos.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.helenos.backend.dto.UserDto;
import com.helenos.backend.model.Library;
import com.helenos.backend.model.Media;
import com.helenos.backend.model.User;
import com.helenos.backend.repository.LibraryRepository;

@Service
public class LibraryService {

	@Autowired
	private LibraryRepository libraryRepository;
	@Autowired
	private UserService userService;
	
	public Page<Library> findAllByUser(Long idUser, Pageable pageable) {
		
		Page<Library> libraries = this.libraryRepository.findAllByUser(idUser, pageable);
		
		if (libraries != null && !libraries.getContent().isEmpty()) {
			
			for(Library library: libraries.getContent()) {
				
				List<Media> medias = new ArrayList<Media>();
				
				if (library.getMedias() != null && library.getMedias().size() != 0) {
					
					medias.add(library.getMedias().get(0));
				}
				library.setMedias(medias);
		    }
		}
		return libraries;
	}
	
	public Page<Library> findAllSharedByUser(Long idUser, Pageable pageable) {
		
//		User user = restTemplate.getForObject("http://user-service/media/accountUsers/" + idUser, User.class);
		User user = this.userService.findById(idUser);
		Page<Library> libraries = this.libraryRepository.findAllSharedByUser(user, pageable);
		
		if (libraries != null && !libraries.getContent().isEmpty()) {
			
			for(Library library: libraries.getContent()) {
				
				List<Media> medias = new ArrayList<Media>();
				
				if (library.getMedias() != null && library.getMedias().size() != 0) {
					
					medias.add(library.getMedias().get(0));
				}
				library.setMedias(medias);
		    }
		}
		return libraries;
	}
	
	public Library save(Library library, Long idUser) {
		
//		User ownedUser = restTemplate.getForObject("http://user-service/media/accountUsers/" + idUser, User.class);
		User owner = this.userService.findById(idUser);
		library.setOwnedUser(owner);
		if (library.getMedias() != null) {
			System.out.println(library.getMedias().size());
			library.getMedias().forEach(media -> {
				System.out.println(media);
				media.setLibrary(library);
			});
		}
		return this.libraryRepository.save(library);
	}
	
	public Library update(Library library) {
		return this.libraryRepository.save(library);
	}
	
	public Optional<Library> findById(Long idLibrary) {
		Optional<Library> optLibrary = this.libraryRepository.findById(idLibrary);
		return optLibrary;
	}
	
	public void deleteLibrary(Long idLibrary) {
		Optional<Library> optLibrary = this.libraryRepository.findById(idLibrary);
		if (optLibrary.isPresent()) {
			Library library = optLibrary.get();
			Set<User> sharedUsers = library.getUsers();
			for(User sharedUser: sharedUsers) {
				sharedUser.setSharedLibraries(null);
//				restTemplate.postForEntity("http://user-service/media/users", sharedUser, UserDto.class);
				this.userService.save(sharedUser);
			}
			this.libraryRepository.delete(library);
		}
	}
}
