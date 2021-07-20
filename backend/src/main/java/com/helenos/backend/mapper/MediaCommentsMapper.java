//package com.helenos.backend.mapper;
//
//import org.mapstruct.Mapper;
//import org.mapstruct.factory.Mappers;
//
//import com.helenos.backend.dto.CommentDto;
//import com.helenos.backend.dto.MediaCommentsDto;
//import com.helenos.backend.model.Image;
//import com.helenos.backend.model.Media;
//import com.helenos.backend.model.Sound;
//import com.helenos.backend.model.Video;
//
//@Mapper
//public class MediaCommentsMapper {
//
//	public static MediaCommentsMapper INSTANCE = Mappers.getMapper( MediaCommentsMapper.class );
//	
//	public MediaCommentsDto toMediaCommentsDto(Media media) {
//		
//		MediaCommentsDto mediaCommentsDto = new MediaCommentsDto();
//		mediaCommentsDto.setName(media.getName());
//		mediaCommentsDto.setPath(media.getPath());
//		mediaCommentsDto.setId(media.getId());
//		mediaCommentsDto.setOwnerId(media.getLibrary().getOwnedUser().getId());
//		mediaCommentsDto.setLibraryTitle(media.getLibrary().getTitle());
//		if (media instanceof Image) {
//			mediaCommentsDto.setType("image");
//		} else if (media instanceof Video) {
//			mediaCommentsDto.setType("video");
//		}  else if (media instanceof Sound) {
//			mediaCommentsDto.setType("sound");
//		}
//		
//		media.getComments().forEach(comment -> {
//			CommentDto commentDto = new CommentDto();
//			commentDto.setFirstName(comment.getUser().getFirstName());
//			commentDto.setLastName(comment.getUser().getLastName());
//			commentDto.setPicture(comment.getUser().getPicture());
//			commentDto.setId(comment.getId());
//			commentDto.setText(comment.getText());
//			mediaCommentsDto.getComments().add(commentDto);
//		});
//		
//		return mediaCommentsDto;
//	}
//}
