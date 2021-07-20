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
import org.springframework.web.bind.annotation.RestController;

import com.helenos.backend.dto.DisplayLibraryDto;
import com.helenos.backend.dto.DisplaySharedLibraryDto;
import com.helenos.backend.dto.LibraryDto;
import com.helenos.backend.dto.SaveLibraryDto;
import com.helenos.backend.dto.ShortShortLibraryDto;
import com.helenos.backend.mapper.DisplayLibraryMapper;
import com.helenos.backend.mapper.DisplaySharedLibraryMapper;
import com.helenos.backend.mapper.LibraryMapper;
import com.helenos.backend.mapper.SaveLibraryMapper;
import com.helenos.backend.service.LibraryService;
import com.helenos.backend.model.Library;

@RestController
@RequestMapping("media")
public class LibraryController {

	private LibraryService libraryService;
	private ModelMapper modelMapper;
	
	@Autowired
	public LibraryController(LibraryService libraryService, ModelMapper modelMapper) {
		this.libraryService = libraryService;
		this.modelMapper = modelMapper;
	}

	@GetMapping("/users/{idUser}/libraries")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	Page<DisplayLibraryDto> findAllByUser(@PathVariable Long idUser, @PageableDefault(size = 9) Pageable pageable) {
				
		Page<Library> libraries = this.libraryService.findAllByUser(idUser, pageable);
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
	@PreAuthorize("isLibraryOwnedByPrincipal(#idLibrary)")
	LibraryDto findLibrary(@PathVariable Long idLibrary) {
		Optional<Library> optLibrary = this.libraryService.findById(idLibrary);
		if (optLibrary.isPresent()) {
			LibraryDto libraryDto = LibraryMapper.INSTANCE.toLibraryDto(optLibrary.get());
			return libraryDto;
		} else {
			return null;
		}
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
	public ShortShortLibraryDto update(@RequestBody @Valid ShortShortLibraryDto shortShortLibraryDto, @PathVariable Long idUser) {

		Optional<Library> optLibrary = this.libraryService.findById(shortShortLibraryDto.getId());
		if (optLibrary.isPresent()) {
			this.modelMapper.map(shortShortLibraryDto, optLibrary.get());
			Library savedLibrary = this.libraryService.update(optLibrary.get());
			ShortShortLibraryDto savedshortShortLibraryDto = this.modelMapper.map(savedLibrary, ShortShortLibraryDto.class);
			return savedshortShortLibraryDto;
		} else {
			return null;
		}
	}
	
	@DeleteMapping("/users/{idUser}/libraries/{idLibrary}")
	@PreAuthorize("hasRole('ROLE_USER') and #idUser == principal.user.id")
	public Long delete(@PathVariable Long idUser, @PathVariable Long idLibrary) {

		this.libraryService.deleteLibrary(idLibrary);

		return idLibrary;
	}
}
