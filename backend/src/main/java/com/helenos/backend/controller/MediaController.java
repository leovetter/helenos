package com.helenos.backend.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.helenos.backend.dto.CommentDto;
import com.helenos.backend.dto.FullCommentDto;
import com.helenos.backend.dto.MediaDto;
import com.helenos.backend.dto.UpdateMediaDto;
import com.helenos.backend.mapper.AddMediasMapper;
import com.helenos.backend.model.Comment;
import com.helenos.backend.model.Media;
import com.helenos.backend.service.MediaService;

@RestController
@RequestMapping("media")
public class MediaController {
	
	private MediaService mediaService;
	private ModelMapper modelMapper;
	
	@Autowired
	public MediaController(MediaService mediaService, ModelMapper modelMapper) {
        this.mediaService = mediaService;
        this.modelMapper = modelMapper;
    }
	
	@PutMapping("/users/{idUser}/medias")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	public UpdateMediaDto update(@RequestBody @Valid UpdateMediaDto updateMediaDto, @PathVariable Long idUser) {
		
		Media media = this.mediaService.findById(updateMediaDto.getId());
		this.modelMapper.map(updateMediaDto, media);
		Media savedMedia = this.mediaService.update(media);
		UpdateMediaDto savedUpdateMediaDto = this.modelMapper.map(savedMedia, UpdateMediaDto.class);

		return savedUpdateMediaDto;
	}
	
	@DeleteMapping("/users/{idUser}/medias/{idMedia}")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	public Long delete(@PathVariable Long idUser, @PathVariable Long idMedia) {

		this.mediaService.deleteMedia(idMedia);

		return idMedia;
	}
	
	@PostMapping("/users/{idUser}/library/{idLibrary}/medias")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	public List<MediaDto> addMediasToLibrary(@RequestBody @Valid List<MediaDto> mediasDto, @PathVariable Long idUser,
											 @PathVariable Long idLibrary) {
		
		List<Media> medias = AddMediasMapper.INSTANCE.toMedias(mediasDto);
		List<Media> savedMedias = this.mediaService.addMediasToLibrary(idLibrary, medias);
		List<MediaDto> savedMediasDto = AddMediasMapper.INSTANCE.toMediasDto(savedMedias);
				
		return savedMediasDto;
	}
	
	@GetMapping("/{idMedia}/comment")
	@PreAuthorize("hasRole('ROLE_USER')")
	List<FullCommentDto> loadComments(@PathVariable Long idMedia) {
				
		List<Comment> comments = this.mediaService.loadComments(idMedia);
		List<FullCommentDto> fullCommentsDto = new ArrayList<FullCommentDto>();
		comments.forEach(comment -> {
			FullCommentDto fullCommentDto = new FullCommentDto();
			fullCommentDto.setId(comment.getId());
			fullCommentDto.setFirstName(comment.getUser().getFirstName());
			fullCommentDto.setLastName(comment.getUser().getLastName());
			fullCommentDto.setPicture(comment.getUser().getPicture());
			fullCommentDto.setText(comment.getText());
			fullCommentDto.setIdMedia(comment.getMedia().getId());
			fullCommentDto.setIdUser(comment.getUser().getId());
			fullCommentsDto.add(fullCommentDto);
		});
		
		return fullCommentsDto;
	}
	
	@PostMapping("/comment")
	public FullCommentDto addComments(@RequestBody @Valid CommentDto commentDto) {
		
		System.out.println("CommentDto");
		System.out.println(commentDto);
		Comment comment = this.mediaService.addComment(commentDto.getComment(), commentDto.getIdMedia(), commentDto.getIdUser());
		FullCommentDto fullCommentDto = new FullCommentDto();
		fullCommentDto.setId(comment.getId());
		fullCommentDto.setIdMedia(comment.getMedia().getId());
		fullCommentDto.setIdUser(comment.getUser().getId());
		fullCommentDto.setText(comment.getText());
		fullCommentDto.setFirstName(comment.getUser().getFirstName());
		fullCommentDto.setLastName(comment.getUser().getLastName());
		fullCommentDto.setPicture(comment.getUser().getPicture());
		
		return fullCommentDto;
	}
}
