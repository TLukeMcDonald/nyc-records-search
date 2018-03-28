package com.example.favsapi.controllers;

import com.example.favsapi.models.Fav;
import com.example.favsapi.repositories.FavRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


@RestController
public class FavsController {

	@Autowired
	private FavRepository favRepository;

	@GetMapping("/")
	public List<Fav> findAllFavs() {
		return favRepository.findAll();
	}

	@GetMapping("/{favId}")
	public Fav findFavById(@PathVariable Long favId) throws NotFoundException {

		Fav foundFav = favRepository.findOne(favId);

		if (foundFav == null) {
			throw new NotFoundException("Fav with ID of " + favId + " was not found!");
		}

		return foundFav;
	}

//	@PostMapping("/")
//	public Fav createNewFav(@RequestBody Fav newFav) {
//		System.out.println(newFav);
//		return favRepository.save(newFav);
//	}

	@PostMapping("/")
	public Fav createNewFav(@RequestBody Fav newFav){
        System.out.println(newFav);
        return favRepository.save(newFav);
    }


	@DeleteMapping("/{favId}")
	public HttpStatus deleteFavById(@PathVariable Long favId) throws EmptyResultDataAccessException {

		favRepository.delete(favId);
		return HttpStatus.OK;
	}

	@PatchMapping("/{favId}")
	public Fav updateFavById(@PathVariable Long favId, @RequestBody Fav favRequest) throws NotFoundException {
		Fav favFromDb = favRepository.findOne(favId);

		if (favFromDb == null) {
			throw new NotFoundException("Fav with ID of " + favId + " was not found!");
		}

		favFromDb.setUserFav(favRequest.getUserFav());
		favFromDb.setShortTitle(favRequest.getShortTitle());

		return favRepository.save(favFromDb);
	}

	// EXCEPTION HANDLERS

	@ExceptionHandler
	void handleFavNotFound(
		NotFoundException exception,
		HttpServletResponse response) throws IOException {

		response.sendError(HttpStatus.NOT_FOUND.value(), exception.getMessage());
	}

	@ExceptionHandler
	void handleDeleteNotFoundException(
		EmptyResultDataAccessException exception,
		HttpServletResponse response) throws IOException {

		response.sendError(HttpStatus.NOT_FOUND.value());
	}
}
