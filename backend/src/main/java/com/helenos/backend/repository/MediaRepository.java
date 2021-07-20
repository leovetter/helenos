package com.helenos.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.helenos.backend.model.Library;
import com.helenos.backend.model.Media;
import com.helenos.backend.model.User;

public interface MediaRepository extends JpaRepository<Media, Long> {
    
    @Query(value="SELECT * FROM media_user usr WHERE lower(usr.first_name) LIKE lower(concat('%', :searchTerm,'%')) OR lower(usr.last_name) LIKE lower(concat('%', :searchTerm,'%')) ORDER BY usr.first_name ASC LIMIT 10", nativeQuery=true)
    List<User> findUsers(@Param("searchTerm") String searchTerm);
    
    Media findByPathAndLibrary(String path, Library library);
}
