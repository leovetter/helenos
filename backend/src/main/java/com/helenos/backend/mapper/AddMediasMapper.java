package com.helenos.backend.mapper;

import java.util.ArrayList;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.helenos.backend.dto.MediaDto;
import com.helenos.backend.model.Image;
import com.helenos.backend.model.Media;
import com.helenos.backend.model.Sound;
import com.helenos.backend.model.Video;

@Mapper
public abstract class AddMediasMapper {
	
	public static AddMediasMapper INSTANCE = Mappers.getMapper( AddMediasMapper.class );
	
	public List<Media> toMedias(List<MediaDto> mediasDto) {
		
		List<Media> medias = new ArrayList<Media>();
		for(MediaDto mediaDto: mediasDto) {
			if (mediaDto.getType().contains("image")) {
				Image image = new Image();
				image.setName(mediaDto.getName());
				image.setCover(mediaDto.getCover());
				image.setPath(mediaDto.getPath());
				image.setSize(mediaDto.getSize());
				image.setOrderMedia(mediaDto.getOrder());
				image.setApi(mediaDto.getApi());
				image.setFromApi(mediaDto.getFromApi());
				medias.add(image);
			} else if (mediaDto.getType().contains("video")) {
				Video video = new Video();
				video.setName(mediaDto.getName());
				video.setCover(mediaDto.getCover());
				video.setPath(mediaDto.getPath());
				video.setSize(mediaDto.getSize());
				video.setOrderMedia(mediaDto.getOrder());
				video.setApi(mediaDto.getApi());
				video.setFromApi(mediaDto.getFromApi());
				medias.add(video);
			} else if (mediaDto.getType().contains("audio")) {
				Sound sound = new Sound();
				sound.setName(mediaDto.getName());
				sound.setPath(mediaDto.getPath());
				sound.setSize(mediaDto.getSize());
				sound.setOrderMedia(mediaDto.getOrder());
				sound.setCover(mediaDto.getCover());
				sound.setApi(mediaDto.getApi());
				sound.setFromApi(mediaDto.getFromApi());
				medias.add(sound);
			}
		}
		
		return medias;
	}
	
	public List<MediaDto> toMediasDto(List<Media> medias) {
		
		List<MediaDto> mediasDto = new ArrayList<MediaDto>();
		for(Media media: medias) {
			MediaDto mediaDto = new MediaDto();
			mediaDto.setId(media.getId());
			mediaDto.setCreationDate(media.getCreationDate());
			mediaDto.setName(media.getName());
			mediaDto.setPath(media.getPath());
			mediaDto.setSize(media.getSize());
			mediaDto.setUpdateDate(media.getUpdateDate());
			mediaDto.setOrder(media.getOrderMedia());
			mediaDto.setCover(media.getCover());
			mediaDto.setApi(media.getApi());
			mediaDto.setFromApi(media.getFromApi());
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
