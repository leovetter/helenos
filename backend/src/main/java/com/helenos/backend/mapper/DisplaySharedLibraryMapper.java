package com.helenos.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.helenos.backend.dto.DisplayMediaDto;
import com.helenos.backend.dto.DisplaySharedLibraryDto;
import com.helenos.backend.model.Image;
import com.helenos.backend.model.Library;
import com.helenos.backend.model.Media;
import com.helenos.backend.model.Sound;
import com.helenos.backend.model.Video;

@Mapper
public abstract class DisplaySharedLibraryMapper {

	public static DisplaySharedLibraryMapper INSTANCE = Mappers.getMapper( DisplaySharedLibraryMapper.class );
	
	public DisplaySharedLibraryDto toDisplayLibraryDto(Library library) {
		
		DisplaySharedLibraryDto displaySharedLibraryDto = new DisplaySharedLibraryDto();
		displaySharedLibraryDto.setId(library.getId());
		displaySharedLibraryDto.setOwnedUserId(library.getOwnedUser().getId());
		library.getOwnedUser().getId();
		displaySharedLibraryDto.setTitle(library.getTitle());
		displaySharedLibraryDto.setSize(library.getSize());
		displaySharedLibraryDto.setCreationDate(library.getCreationDate());
		displaySharedLibraryDto.setUpdateDate(library.getUpdateDate());
		DisplayMediaDto displayMediaDto = new DisplayMediaDto();
		Media media = library.getMedias().get(0);
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
		displaySharedLibraryDto.setMedia(displayMediaDto);
		
        return displaySharedLibraryDto;
    }
}
