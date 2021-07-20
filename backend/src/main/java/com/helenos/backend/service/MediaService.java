package com.helenos.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.helenos.backend.exception.LibraryNotFoundException;
import com.helenos.backend.model.Comment;
import com.helenos.backend.model.Library;
import com.helenos.backend.model.Media;
import com.helenos.backend.model.User;
import com.helenos.backend.repository.CommentRepository;
import com.helenos.backend.repository.LibraryRepository;
import com.helenos.backend.repository.MediaRepository;
import com.helenos.backend.repository.MediaUserRepository;
import com.helenos.backend.storage.FileSystemStorageService;

@Service
public class MediaService {
	
	@Autowired
	private MediaRepository mediaRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private LibraryService libraryService;
	@Autowired
	private LibraryRepository libraryRepository;
	@Autowired
	private MediaUserRepository mediaUserRepository;
	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private FileSystemStorageService fileSystemStorageService;
	
	public Media findById(Long id) {
		Optional<Media> optMedia = mediaRepository.findById(id);
		if (optMedia.isPresent()) {
			System.out.println(optMedia.get().getComments());
			return optMedia.get();
		} else {
			// TODO throw MediaNotFoundException
			return null;
		}
	}
	
	public Comment addComment(String text, Long idMedia, Long idUser) {
		
		Comment comment = new Comment();
		comment.setText(text);
		Optional<Media> optMedia = this.mediaRepository.findById(idMedia);
		
		if(optMedia.isPresent()) {
			comment.setMedia(optMedia.get());
		} // TODO : else throw MediaNotFoundException
		
		Optional<User> optUser = this.mediaUserRepository.findById(idUser);
		if(optUser.isPresent()) {
			comment.setUser(optUser.get());
		} // TODO : else throw UserNotFoundException
		
		
		System.out.println("Comment");
		System.out.println(comment);
		Comment savedComment = this.commentRepository.save(comment);
		
		return savedComment;
	}
	
	public List<Comment> loadComments(Long idMedia) {
		
		Optional<Media> optMedia = this.mediaRepository.findById(idMedia);
		
		if(optMedia.isPresent()) {
			
			List<Comment> comments = this.commentRepository.findByMedia(optMedia.get());
			return comments;
		} // TODO : else throw MediaNotFoundException
		return null;
	}
	
	public Media update(Media media) {
		Library library = media.getLibrary();
		library.setUpdateDate(new Date());
		libraryRepository.save(library);
		return mediaRepository.save(media);
	}
	
		public void deleteMedia(Long idMedia) {
		
		Optional<Media> optMedia = mediaRepository.findById(idMedia);
		if (optMedia.isPresent()) {
			
			Media media = optMedia.get();
			this.fileSystemStorageService.deleteFile(media.getLibrary().getOwnedUser().getId(), media.getLibrary().getTitle(), media.getPath());;
			Library library = media.getLibrary();
			library.setUpdateDate(new Date());
			libraryRepository.save(library);
			mediaRepository.delete(media);
		}
	}
	
	public List<Media> addMediasToLibrary(Long idLibrary, List<Media> medias) {
		
		Optional<Library> optLibrary = libraryRepository.findById(idLibrary);
		Library library = null;
		if (optLibrary.isPresent()) {
			
			library = optLibrary.get();
			Integer size = library.getSize();
			for(Media media: medias) {
				media.setLibrary(library);
				media.setCreationDate(new Date());
				media.setUpdateDate(new Date());
				if(media.getSize() != null)
					size += media.getSize();
			}
			library.addMedias(medias);
			library.setUpdateDate(new Date());
	        library.setSize(size);
			library = libraryRepository.save(library);
			for(Media media: library.getMedias()) {
				for(Media mediaToSent: medias) {
					if(mediaToSent.getName() == media.getName()) {
						mediaToSent.setId(media.getId());
					}
				}
			}
			
		} else {
			throw new LibraryNotFoundException(idLibrary);
		}
		
		return medias;
	}
	
	public String findNameByPath(String path, Long idUser, String albumName) {
		System.out.println(path);
		System.out.println(idUser);
		System.out.println(albumName);
		User user = this.userService.findById(idUser);
		System.out.println(user);
		Library library = this.libraryService.findByUserAndName(user, albumName);
		System.out.println(library);
		Media media = this.mediaRepository.findByPathAndLibrary(path, library);
		System.out.println(media);
		return media.getName();
	}
}
