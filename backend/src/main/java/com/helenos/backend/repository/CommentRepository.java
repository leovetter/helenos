package com.helenos.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helenos.backend.model.Comment;
import com.helenos.backend.model.Media;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> findByMedia(Media media);
}
