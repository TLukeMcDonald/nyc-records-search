package com.example.springbootmicroservicewrapperwithtests.repositories;

import com.example.springbootmicroservicewrapperwithtests.models.Fav;
import org.springframework.data.repository.CrudRepository;

public interface FavRepository extends CrudRepository<Fav, Long> {

}