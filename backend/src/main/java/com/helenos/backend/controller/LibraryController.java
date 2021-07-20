package com.helenos.backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.helenos.backend.dto.DisplayLibraryDto;
import com.helenos.backend.dto.DisplaySharedLibraryDto;
import com.helenos.backend.dto.EditLibraryDto;
import com.helenos.backend.dto.LibraryDto;
import com.helenos.backend.dto.SaveLibraryDto;
import com.helenos.backend.dto.SaveEditLibraryDto;
import com.helenos.backend.mapper.DisplayLibraryMapper;
import com.helenos.backend.mapper.DisplaySharedLibraryMapper;
import com.helenos.backend.mapper.EditLibraryMapper;
import com.helenos.backend.mapper.LibraryMapper;
import com.helenos.backend.mapper.SaveLibraryMapper;
import com.helenos.backend.model.Library;
import com.helenos.backend.service.LibraryService;
import com.helenos.backend.service.SecurityService;

@RestController
@RequestMapping("media")
public class LibraryController {

	private LibraryService libraryService;
	private SecurityService securityService;
	private ModelMapper modelMapper;
	
	@Autowired
	public LibraryController(LibraryService libraryService, ModelMapper modelMapper, SecurityService securityService) {
		this.libraryService = libraryService;
		this.securityService = securityService;
		this.modelMapper = modelMapper;
	}

	@GetMapping("/users/{idUser}/libraries")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	Page<DisplayLibraryDto> findAllByUser(@PathVariable Long idUser, @PageableDefault(size = 9) Pageable pageable) {
				
		Page<Library> libraries = this.libraryService.findAllByUser(idUser, pageable);
		List<DisplayLibraryDto> displayLibraryDtos = new ArrayList<DisplayLibraryDto>();
		for(Library library: libraries.getContent()) {
			DisplayLibraryDto displayLibraryDto = DisplayLibraryMapper.INSTANCE.toDisplayLibraryDto(library);
			displayLibraryDtos.add(displayLibraryDto);
		}
		return new PageImpl<>(displayLibraryDtos, pageable, libraries.getTotalElements());
	}
	
	@GetMapping("/users/{idUser}/person/{idPerson}/libraries")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	Page<DisplayLibraryDto> findAllByPerson(@PathVariable Long idUser, @PathVariable Long idPerson, @PageableDefault(size = 9) Pageable pageable) {
				
		Page<Library> libraries = this.libraryService.findAllByPerson(idPerson, pageable);
		System.out.println(libraries.getContent());
		List<DisplayLibraryDto> displayLibraryDtos = new ArrayList<DisplayLibraryDto>();
		for(Library library: libraries) {
			DisplayLibraryDto displayLibraryDto = DisplayLibraryMapper.INSTANCE.toDisplayLibraryDto(library);
			displayLibraryDtos.add(displayLibraryDto);
		}
		return new PageImpl<>(displayLibraryDtos, pageable, libraries.getTotalElements());
	}
	
	@GetMapping("/users/{idUser}/shared-libraries")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	Page<DisplaySharedLibraryDto> findAllSharedByUser(@PathVariable Long idUser, @PageableDefault(size = 9) Pageable pageable) {
				
		Page<Library> libraries = this.libraryService.findAllSharedByUser(idUser, pageable);
		List<DisplaySharedLibraryDto> displaySharedLibraryDtos = new ArrayList<DisplaySharedLibraryDto>();
		for(Library library: libraries) {
			DisplaySharedLibraryDto displaySharedLibraryDto = DisplaySharedLibraryMapper.INSTANCE.toDisplayLibraryDto(library);
			displaySharedLibraryDtos.add(displaySharedLibraryDto);
		}
		return new PageImpl<>(displaySharedLibraryDtos, pageable, libraries.getTotalElements());
	}

	@GetMapping("/libraries/{idLibrary}")
	@PreAuthorize("@securityService.canAccessAlbum(principal, #idLibrary)")
	LibraryDto findLibrary(@PathVariable Long idLibrary) {
		
		Library library = this.libraryService.findById(idLibrary);
		LibraryDto libraryDto = LibraryMapper.INSTANCE.toLibraryDto(library);
		return libraryDto;
	}

	
	@GetMapping("/libraries/{idLibrary}/edit")
	EditLibraryDto editLibrary(@PathVariable Long idLibrary) {
		
		Library library = this.libraryService.findById(idLibrary);
		EditLibraryDto editLibraryDto = EditLibraryMapper.INSTANCE.toEditLibraryDto(library);
		return editLibraryDto;
	}

	@PostMapping("/users/{idUser}/libraries")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	public SaveLibraryDto save(@PathVariable Long idUser, @RequestBody @Valid SaveLibraryDto saveLibraryDto) {

		Library library = SaveLibraryMapper.INSTANCE.toLibrary(saveLibraryDto);
		Library savedLibrary = this.libraryService.save(library, idUser);
		SaveLibraryDto savedLibraryDto = this.modelMapper.map(savedLibrary, SaveLibraryDto.class);

		return savedLibraryDto;
	}
	
	@PutMapping("/users/{idUser}/libraries")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	public SaveEditLibraryDto update(@RequestBody @Valid SaveEditLibraryDto saveEditLibraryDto, @PathVariable Long idUser) {

		Library library = this.libraryService.findById(saveEditLibraryDto.getId());
		this.modelMapper.map(saveEditLibraryDto, library);
		library.setIsPublicAlbum(saveEditLibraryDto.getPublicAlbum());
		Library savedLibrary = this.libraryService.update(library);
		SaveEditLibraryDto savedEditibraryDto = this.modelMapper.map(savedLibrary, SaveEditLibraryDto.class);
		return savedEditibraryDto;
	}
	
	@DeleteMapping("/users/{idUser}/libraries/{idLibrary}")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	public Long delete(@PathVariable Long idUser, @PathVariable Long idLibrary) {

		this.libraryService.deleteLibrary(idLibrary);

		return idLibrary;
	}
	
	@GetMapping("/library/{idAlbum}")
	public void setVisibilityAlbum(@PathVariable Long idAlbum, @RequestParam Boolean isPublic) {

		this.libraryService.setAlbumVisibility(idAlbum, isPublic);
	}
	
	@PostMapping("/library/reOrder")
	public LibraryDto reorder(@RequestBody List<Integer> indexes) {

		Library album = this.libraryService.reOrderAlbum(indexes);
		LibraryDto libraryDto = LibraryMapper.INSTANCE.toLibraryDto(album);

		return libraryDto;
	}
	
	
}
