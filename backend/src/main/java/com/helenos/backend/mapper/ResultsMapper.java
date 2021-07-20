package com.helenos.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.helenos.backend.dto.ResultDto;
import com.helenos.backend.model.Library;
import com.helenos.backend.model.User;

@Mapper
public class ResultsMapper {

public static ResultsMapper INSTANCE = Mappers.getMapper( ResultsMapper.class );
	
	public ResultDto userToResultDto(User user, Integer numberAlbums) {
		
		ResultDto resultDto = new ResultDto();
		resultDto.setType("user");
		resultDto.setIdUser(user.getId());
		resultDto.setFirstName(user.getFirstName());
		resultDto.setLastName(user.getLastName());
		resultDto.setPicture(user.getPicture());
		resultDto.setAlbumNumber(numberAlbums);
		
        return resultDto;
    }
	
	public ResultDto libraryToResultDto(Library library) {
		
		ResultDto resultDto = new ResultDto();
		resultDto.setType("album");
		resultDto.setTitle(library.getTitle());
		resultDto.setAudioNumber(library.getMedias().size());
		resultDto.setCoverOwnerId(library.getOwnedUser().getId());
		if(library.getMedias().size() != 0)
			resultDto.setCover(library.getMedias().get(0).getPath());
		
        return resultDto;
    }
}
