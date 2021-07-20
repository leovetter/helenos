package com.helenos.media.mapper;

import java.util.ArrayList;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.helenos.media.dto.MediaDto;
import com.helenos.model.Image;
import com.helenos.model.Media;
import com.helenos.model.Sound;
import com.helenos.model.Video;

@Mapper
public abstract class AddMediasMapper {
	
	public static AddMediasMapper INSTANCE = Mappers.getMapper( AddMediasMapper.class );
	
	public List<Media> toMedias(List<MediaDto> mediasDto) {
		
		List<Media> medias = new ArrayList<Media>();
		for(MediaDto mediaDto: mediasDto) {
			if (mediaDto.getType().contains("image")) {
				Image image = new Image();
				image.setName(mediaDto.getName());
				image.setPath(mediaDto.getPath());
				image.setSize(mediaDto.getSize());
				medias.add(image);
			} else if (mediaDto.getType().contains("video")) {
				Video video = new Video();
				video.setName(mediaDto.getName());
				video.setPath(mediaDto.getPath());
				video.setSize(mediaDto.getSize());
				medias.add(video);
			} else if (mediaDto.getType().contains("audio")) {
				Sound sound = new Sound();
				sound.setName(mediaDto.getName());
				sound.setPath(mediaDto.getPath());
				sound.setSize(mediaDto.getSize());
				medias.add(sound);
			}
		}
		
		return medias;
	}
	
	public List<MediaDto> toMediasDto(List<Media> medias) {
		
		List<MediaDto> mediasDto = new ArrayList<MediaDto>();
		for(Media media: medias) {
			MediaDto mediaDto = new MediaDto();
			mediaDto.setCreationDate(media.getCreationDate());
			mediaDto.setName(media.getName());
			mediaDto.setPath(media.getPath());
			mediaDto.setSize(media.getSize());
			mediaDto.setUpdateDate(media.getUpdateDate());
			if (media instanceof Image) {
				mediaDto.setType("image");
			} else if (media instanceof Video) {
				mediaDto.setType("video");
			} else if (media instanceof Sound) {
				mediaDto.setType("sound");
			}
			mediasDto.add(mediaDto);
		}
		
		return mediasDto;
	}
}
