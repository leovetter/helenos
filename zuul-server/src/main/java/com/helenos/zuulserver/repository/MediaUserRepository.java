package com.helenos.zuulserver.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.helenos.model.User;

public interface MediaUserRepository extends JpaRepository<User, Long> {
	 
    Optional<User> findByEmail(String email);
        
    List<User> findFirst10ByOrderByFirstNameAsc();
    
    @Query(value="SELECT * FROM media_user usr WHERE lower(usr.first_name) LIKE lower(concat('%', :searchTerm,'%')) OR lower(usr.last_name) LIKE lower(concat('%', :searchTerm,'%')) ORDER BY usr.first_name ASC LIMIT 10", nativeQuery=true)
    List<User> findUsers(@Param("searchTerm") String searchTerm);
}