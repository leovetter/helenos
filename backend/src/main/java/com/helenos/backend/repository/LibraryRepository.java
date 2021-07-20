package com.helenos.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.helenos.backend.model.Library;
import com.helenos.backend.model.User;

public interface LibraryRepository extends JpaRepository<Library, Long> {
	
	Page<Library> findByOwnedUserAndIsPublicAlbum(User ownedUser, boolean isPublicAlbum, Pageable pageable);
	
	List<Library> findByTitleIgnoreCaseLike(String title);
	
	List<Library> findByOwnedUserAndIsPublicAlbum(User ownedUser, Boolean isPublicAlbum); 
	
	Library findByOwnedUserAndTitle(User ownedUser, String title);
	
	@Query("SELECT libraries FROM Library libraries WHERE ownedUser.id = :idUser")
	Page<Library> findAllByUser(@Param("idUser") Long idUser, Pageable pageable);
	
	@Query("SELECT lb FROM Library lb JOIN lb.users usr WHERE usr = :user")
	Page<Library> findAllSharedByUser(@Param("user") User user, Pageable pageable);
}