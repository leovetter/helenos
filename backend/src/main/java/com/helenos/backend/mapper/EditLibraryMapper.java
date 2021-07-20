package com.helenos.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.helenos.backend.dto.EditLibraryDto;
import com.helenos.backend.model.Library;

@Mapper
public abstract class EditLibraryMapper {

	public static EditLibraryMapper INSTANCE = Mappers.getMapper( EditLibraryMapper.class );
	
	public EditLibraryDto toEditLibraryDto(Library library) {
		
		EditLibraryDto libraryDto = new EditLibraryDto();
		libraryDto.setId(library.getId());
		libraryDto.setPublicAlbum(library.getIsPublicAlbum());
		libraryDto.setCover(library.getCover());
		libraryDto.setId(library.getId());
		libraryDto.setOwnedUserId(library.getOwnedUser().getId());
		libraryDto.setTitle(library.getTitle());
		
        return libraryDto;
    }
}