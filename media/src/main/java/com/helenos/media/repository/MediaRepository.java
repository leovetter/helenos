package com.helenos.media.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helenos.model.Media;

public interface MediaRepository extends JpaRepository<Media, Long> {
}
