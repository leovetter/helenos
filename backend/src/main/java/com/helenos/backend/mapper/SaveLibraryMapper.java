package com.helenos.backend.mapper;

import java.util.ArrayList;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.helenos.backend.dto.MediaDto;
import com.helenos.backend.dto.SaveLibraryDto;
import com.helenos.backend.model.Image;
import com.helenos.backend.model.Library;
import com.helenos.backend.model.Media;
import com.helenos.backend.model.Sound;
import com.helenos.backend.model.Video;

@Mapper
public abstract class SaveLibraryMapper {
	
	public static SaveLibraryMapper INSTANCE = Mappers.getMapper( SaveLibraryMapper.class );
	
	public Library toLibrary(SaveLibraryDto saveLibraryDto) {
		Library library = new Library();
		library.setTitle(saveLibraryDto.getTitle());
		library.setCover(saveLibraryDto.getCover());
		List<Media> medias = new ArrayList<Media>();
		for(MediaDto mediaDto: saveLibraryDto.getMedias()) {
			if (mediaDto.getType().contains("image")) {
				Image image = new Image();
				image.setName(mediaDto.getName());
				image.setPath(mediaDto.getPath());
				image.setSize(mediaDto.getSize());
				image.setOrderMedia(mediaDto.getOrder());
				image.setFromApi(mediaDto.getFromApi());
				image.setApi(mediaDto.getApi());
				medias.add(image);
			} else if (mediaDto.getType().contains("video")) {
				Video video = new Video();
				video.setName(mediaDto.getName());
				video.setPath(mediaDto.getPath());
				video.setSize(mediaDto.getSize());
				video.setOrderMedia(mediaDto.getOrder());
				video.setFromApi(mediaDto.getFromApi());
				video.setApi(mediaDto.getApi());
				video.setCover(mediaDto.getCover());
				medias.add(video);
			} else if (mediaDto.getType().contains("audio")) {
				Sound sound = new Sound();
				sound.setName(mediaDto.getName());
				sound.setPath(mediaDto.getPath());
				sound.setSize(mediaDto.getSize());
				sound.setOrderMedia(mediaDto.getOrder());
				sound.setFromApi(mediaDto.getFromApi());
				sound.setApi(mediaDto.getApi());
				medias.add(sound);
			}
		}
		library.setMedias(medias);
        return library;
    }
}
