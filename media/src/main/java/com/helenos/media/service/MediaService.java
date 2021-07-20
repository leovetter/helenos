package com.helenos.media.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.helenos.media.exception.LibraryNotFoundException;
import com.helenos.media.repository.LibraryRepository;
import com.helenos.media.repository.MediaRepository;
import com.helenos.model.Library;
import com.helenos.model.Media;

@Service
public class MediaService {
	
	@Autowired
	private MediaRepository mediaRepository;
	@Autowired
	private LibraryRepository libraryRepository;
	
	public Media findById(Long id) {
		Optional<Media> optMedia = mediaRepository.findById(id);
		if (optMedia.isPresent()) {
			return optMedia.get();
		} else {
			return null;
		}
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
			Library library = optMedia.get().getLibrary();
			library.setUpdateDate(new Date());
			libraryRepository.save(library);
			mediaRepository.delete(optMedia.get());
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
				size += media.getSize();
			}
			library.addMedias(medias);
			library.setUpdateDate(new Date());
	        library.setSize(size);
			library = libraryRepository.save(library);
			
		} else {
			throw new LibraryNotFoundException(idLibrary);
		}
		
		return medias;
	}
}
