package com.helenos.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.helenos.backend.dto.ResultDto;
import com.helenos.backend.mapper.ResultsMapper;
import com.helenos.backend.model.Library;
import com.helenos.backend.model.User;
import com.helenos.backend.security.MediaUserPrincipal;
import com.helenos.backend.service.SearchService;

@RestController
@RequestMapping("media")
public class SearchController {

	private SearchService searchService;
	
	@Autowired
	public SearchController(SearchService searchService) {
		this.searchService = searchService;
	}
	
	@GetMapping("/search/{searchApp}")
	List<ResultDto> search(@PathVariable String searchApp, @AuthenticationPrincipal MediaUserPrincipal principal) {
				
		List<User> users = this.searchService.searchUser(searchApp, principal.getUser());
		List<Library> albums = this.searchService.searchAlbums(searchApp, principal.getUser());
		
		List<ResultDto> resultsDto = new ArrayList<ResultDto>();
		users.forEach(user -> {
			Integer numberAlbums = this.searchService.findPublicAlbumsNumber(user);
			ResultDto resultDto = ResultsMapper.INSTANCE.userToResultDto(user, numberAlbums);
			resultsDto.add(resultDto);
		});
		albums.forEach(album -> {
			ResultDto resultDto = ResultsMapper.INSTANCE.libraryToResultDto(album);
			resultsDto.add(resultDto);
		});
				
		return resultsDto;
	}
}
