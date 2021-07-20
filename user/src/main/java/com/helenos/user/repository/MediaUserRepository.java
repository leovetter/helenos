package com.helenos.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.helenos.model.User;

public interface MediaUserRepository extends JpaRepository<User, Long> {
	 
    Optional<User> findByEmail(String email);
        
    List<User> findFirst10ByOrderByFirstNameAsc();
    
    @Query(value="SELECT * FROM media_user usr WHERE (lower(usr.first_name) LIKE lower(concat('%', :searchTerm,'%')) OR lower(usr.last_name) LIKE lower(concat('%', :searchTerm,'%'))) AND usr.id != :idUser ORDER BY usr.first_name ASC LIMIT 10", nativeQuery=true)
    List<User> findUsers(@Param("searchTerm") String searchTerm, @Param("idUser") Long idUser);
    
    @Query("SELECT usr FROM User usr WHERE usr.id = :idUser AND usr.password = :password")
    Optional<User> checkPassword(@Param("idUser") Long idUser, @Param("password") String password);
}