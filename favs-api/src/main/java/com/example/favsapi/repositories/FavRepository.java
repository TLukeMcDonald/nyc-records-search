package com.example.favsapi.repositories;

import com.example.favsapi.models.Fav;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FavRepository extends CrudRepository<Fav, Long> {

	List<Fav> findAll();

}