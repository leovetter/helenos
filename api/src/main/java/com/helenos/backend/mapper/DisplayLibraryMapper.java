package com.helenos.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.helenos.backend.dto.DisplayLibraryDto;
import com.helenos.backend.dto.DisplayMediaDto;
import com.helenos.backend.model.Image;
import com.helenos.backend.model.Library;
import com.helenos.backend.model.Media;
import com.helenos.backend.model.Sound;
import com.helenos.backend.model.Video;

@Mapper
public abstract class DisplayLibraryMapper {

	public static DisplayLibraryMapper INSTANCE = Mappers.getMapper( DisplayLibraryMapper.class );
	
	public DisplayLibraryDto toDisplayLibraryDto(Library library) {
		
		DisplayLibraryDto displayLibraryDto = new DisplayLibraryDto();
		displayLibraryDto.setId(library.getId());
		displayLibraryDto.setOwnedUserId(library.getOwnedUser().getId());
		displayLibraryDto.setTitle(library.getTitle());
		displayLibraryDto.setSize(library.getSize());
		displayLibraryDto.setCreationDate(library.getCreationDate());
		displayLibraryDto.setUpdateDate(library.getUpdateDate());
		DisplayMediaDto displayMediaDto = new DisplayMediaDto();
		Media media = library.getMedias().get(0);
		System.out.println(media);
		if (media instanceof Image) {
			displayMediaDto.setType("image");
			displayMediaDto.setPath(media.getPath());
		} else if (media instanceof Video) {
			displayMediaDto.setType("video");
			displayMediaDto.setPath(media.getPath());
		} else if (media instanceof Sound) {
			displayMediaDto.setType("sound");
			displayMediaDto.setPath(media.getPath());
		}
		displayLibraryDto.setMedia(displayMediaDto);
		
        return displayLibraryDto;
    }
}
