package com.helenos.backend.mapper;

import java.util.ArrayList;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.helenos.backend.dto.LibraryDto;
import com.helenos.backend.dto.MediaDto;
import com.helenos.backend.model.Image;
import com.helenos.backend.model.Library;
import com.helenos.backend.model.Media;
import com.helenos.backend.model.Sound;
import com.helenos.backend.model.Video;

@Mapper
public abstract class LibraryMapper {

	public static LibraryMapper INSTANCE = Mappers.getMapper( LibraryMapper.class );
	
	public LibraryDto toLibraryDto(Library library) {
		
		LibraryDto libraryDto = new LibraryDto();
		libraryDto.setId(library.getId());
		libraryDto.setOwnedUserId(library.getOwnedUser().getId());
		libraryDto.setTitle(library.getTitle());
		List<MediaDto> mediaDtos = new ArrayList<MediaDto>();
		for (Media media: library.getMedias()) {
			MediaDto mediaDto = new MediaDto();
			if (media instanceof Image) {
				mediaDto.setType("image");
			} else if (media instanceof Video) {
				mediaDto.setType("video");
			}  else if (media instanceof Sound) {
				mediaDto.setType("sound");
			}
			mediaDto.setId(media.getId());
			mediaDto.setPath(media.getPath());
			mediaDto.setName(media.getName());
			mediaDto.setSize(media.getSize());
			mediaDto.setCreationDate(media.getCreationDate());
			mediaDto.setUpdateDate(media.getUpdateDate());
			mediaDtos.add(mediaDto);
		}
		libraryDto.setMedias(mediaDtos);
		
        return libraryDto;
    }
}