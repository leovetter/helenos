package com.helenos.backend.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.helenos.backend.model.Image;
import com.helenos.backend.model.Library;
import com.helenos.backend.model.Media;
import com.helenos.backend.model.User;
import com.helenos.backend.repository.LibraryRepository;
import com.helenos.backend.sort.OrderMediaCompare;
import com.helenos.backend.storage.FileSystemStorageService;

@Service
public class LibraryService {

	@Autowired
	private LibraryRepository libraryRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private FileSystemStorageService fileSystemStorageService;
	
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
	
	public Page<Library> findAllByPerson(Long idPerson, Pageable pageable) {
		
		User person = this.userService.findById(idPerson);
		Page<Library> libraries = this.libraryRepository.findByOwnedUserAndIsPublicAlbum(person, true, pageable);
		System.out.println(libraries.getContent());
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
		
		User owner = this.userService.findById(idUser);
		library.setOwnedUser(owner);
		library.setCreationDate(new Date());
		library.setUpdateDate(new Date());
		library.setIsPublicAlbum(true);
		if (library.getMedias() != null) {
			Integer size = 0;
			for(Media media: library.getMedias()) {
				if(media.getSize() != null)
					size += media.getSize();
				if(media instanceof Image) {
					if(media.getPath().contains("jpg")) {
						media.setPath(media.getPath().replace("jpg", "jpeg"));
					}
				}
				media.setLibrary(library);
			};
			library.setSize(size);
		} else {
			library.setSize(0);
		}
		return this.libraryRepository.save(library);
	}
	
	public Library update(Library library) {
		return this.libraryRepository.save(library);
	}
	
	public Library findById(Long idLibrary) {
		
		Optional<Library> optLibrary = this.libraryRepository.findById(idLibrary);
		if(optLibrary.isPresent()) {
			
			Library album = optLibrary.get();
			List<Media> medias = album.getMedias();
			
			OrderMediaCompare orderMedia = new OrderMediaCompare();
			Collections.sort(medias, orderMedia);
			
			album.setMedias(medias);
			
			return album;
		}
		return null;
	}
	
	public void deleteLibrary(Long idLibrary) {
		Optional<Library> optLibrary = this.libraryRepository.findById(idLibrary);
		if (optLibrary.isPresent()) {
			Library library = optLibrary.get();
			this.fileSystemStorageService.deleteAlbum(library.getOwnedUser().getId(), library.getTitle());
			Set<User> sharedUsers = library.getUsers();
			for(User sharedUser: sharedUsers) {
				sharedUser.setSharedLibraries(null);
//				restTemplate.postForEntity("http://user-service/media/users", sharedUser, UserDto.class);
				this.userService.save(sharedUser);
			}
			this.libraryRepository.delete(library);
		}
	}
	
	public Library findByUserAndName(User user, String name) {
		
		return this.libraryRepository.findByOwnedUserAndTitle(user, name);
	}
	
	public void setAlbumVisibility(Long idAlbum, Boolean isPublic) {
		
		System.out.println(idAlbum);
		System.out.println(isPublic);
		Optional<Library> optLibrary = this.libraryRepository.findById(idAlbum);
		if(optLibrary.isPresent()) {
			Library library = optLibrary.get();
			library.setIsPublicAlbum(isPublic);
			this.libraryRepository.save(library);
		}
	}
	
	public Library reOrderAlbum(List<Integer> indexes) {
		
		Long idAlbum = Long.valueOf(indexes.get(0));
		
		Optional<Library> optAlbum = this.libraryRepository.findById(idAlbum);
		
		if(optAlbum.isPresent()) {
			
			Library album = optAlbum.get();
			List<Media> medias = album.getMedias();
			for(Media media: medias) {
				if(media.getOrderMedia() == indexes.get(1)) {
					media.setOrderMedia(indexes.get(2));
					continue;
				}
				if(media.getOrderMedia() == indexes.get(2)) {
					media.setOrderMedia(indexes.get(1));
				}
			}
			album.setMedias(medias);
			
			album = this.libraryRepository.save(album);
			
			medias = album.getMedias();
			OrderMediaCompare orderMedia = new OrderMediaCompare();
			Collections.sort(medias, orderMedia);
			album.setMedias(medias);
			
			return album;
		}
		
		return null;
	}
}
