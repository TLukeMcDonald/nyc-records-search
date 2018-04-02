package com.example.favsapi.controllers;

import com.example.favsapi.models.Fav;
import com.example.favsapi.repositories.FavRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(FavsController.class)
public class FavsControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private FavRepository mockFavRepository;

	@Autowired
	private ObjectMapper jsonObjectMapper;

	private Fav newFav;
	private Fav updatedSecondFav;

	@Before
	public void setUp() {

		Fav firstFav = new Fav(
				"20151222104",
				"Final Amendments to OER Program Rule and Brownfield Incentive Grant Rule"
		);

		Fav secondFav = new Fav(
				"20131010106",
				"BOARD MEETINGS"
		);

		List<Fav> mockFavs =
			Stream.of(firstFav, secondFav).collect(Collectors.toList());

		given(mockFavRepository.findAll()).willReturn(mockFavs);

		given(mockFavRepository.findOne(1L)).willReturn(firstFav);
		given(mockFavRepository.findOne(4L)).willReturn(null);

		newFav = new Fav(
			"12345678",
			"New Title"
		);
		given(mockFavRepository.save(newFav)).willReturn(newFav);

		updatedSecondFav = new Fav(
			"updated_id",
			"Updated title"
		);
		given(mockFavRepository.save(updatedSecondFav)).willReturn(updatedSecondFav);

		// Mock out Delete to return EmptyResultDataAccessException for missing user with ID of 4
		doAnswer(methodCall -> {
			throw new EmptyResultDataAccessException("ERROR MESSAGE FROM MOCK!!!", 1234);
		}).when(mockFavRepository).delete(4L);

	}

	@Test
	public void findAllFavs_success_returnsStatusOK() throws Exception {

		this.mockMvc
			.perform(get("/"))
			.andExpect(status().isOk());
	}

	@Test
	public void findAllFavs_success_returnAllFavsAsJSON() throws Exception {

		this.mockMvc
			.perform(get("/"))
			.andExpect(jsonPath("$", hasSize(2)));
	}

	@Test
	public void findAllFavs_success_returnFavNameForEachFav() throws Exception {

		this.mockMvc
			.perform(get("/"))
			.andExpect(jsonPath("$[0].userFav", is("20151222104")));
	}

	@Test
	public void findAllFavs_success_returnFirstNameForEachFav() throws Exception {

		this.mockMvc
			.perform(get("/"))
			.andExpect(jsonPath("$[0].shortTitle", is("Final Amendments to OER Program Rule and Brownfield Incentive Grant Rule")));
	}

	@Test
	public void findFavById_success_returnsStatusOK() throws Exception {

		this.mockMvc
			.perform(get("/1"))
			.andExpect(status().isOk());
	}

	@Test
	public void findFavById_success_returnFavName() throws Exception {

		this.mockMvc
			.perform(get("/1"))
			.andExpect(jsonPath("$.userFav", is("20151222104")));
	}

	@Test
	public void findFavById_success_returnFirstName() throws Exception {

		this.mockMvc
			.perform(get("/1"))
			.andExpect(jsonPath("$.shortTitle", is("Final Amendments to OER Program Rule and Brownfield Incentive Grant Rule")));
	}

	@Test
	public void findFavById_failure_userNotFoundReturns404() throws Exception {

		this.mockMvc
			.perform(get("/4"))
			.andExpect(status().isNotFound());
	}

	@Test
	public void findFavById_failure_userNotFoundReturnsNotFoundErrorMessage() throws Exception {

		this.mockMvc
			.perform(get("/4"))
			.andExpect(status().reason(containsString("Fav with ID of 4 was not found!")));
	}

	@Test
	public void deleteFavById_success_returnsStatusOk() throws Exception {

		this.mockMvc
			.perform(delete("/1"))
			.andExpect(status().isOk());
	}

	@Test
	public void deleteFavById_success_deletesViaRepository() throws Exception {

		this.mockMvc.perform(delete("/1"));

		verify(mockFavRepository, times(1)).delete(1L);
	}

	@Test
	public void deleteFavById_failure_userNotFoundReturns404() throws Exception {

		this.mockMvc
			.perform(delete("/4"))
			.andExpect(status().isNotFound());
	}

	@Test
	public void createFav_success_returnsStatusOk() throws Exception {

		this.mockMvc
			.perform(
				post("/")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(newFav))
			)
			.andExpect(status().isOk());
	}

	@Test
	public void createFav_success_returnsFavName() throws Exception {

		this.mockMvc
			.perform(
				post("/")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(newFav))
			)
			.andExpect(jsonPath("$.userFav", is("12345678")));
	}

	@Test
	public void createFav_success_returnsFirstName() throws Exception {

		this.mockMvc
			.perform(
				post("/")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(newFav))
			)
			.andExpect(jsonPath("$.shortTitle", is("New Title")));
	}

	@Test
	public void updateFavById_success_returnsStatusOk() throws Exception {

		this.mockMvc
			.perform(
				patch("/1")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(updatedSecondFav))
			)
			.andExpect(status().isOk());
	}

	@Test
	public void updateFavById_success_returnsUpdatedFavName() throws Exception {

		this.mockMvc
			.perform(
				patch("/1")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(updatedSecondFav))
			)
			.andExpect(jsonPath("$.userFav", is("updated_id")));
	}

	@Test
	public void updateFavById_success_returnsUpdatedFirstName() throws Exception {

		this.mockMvc
			.perform(
				patch("/1")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(updatedSecondFav))
			)
			.andExpect(jsonPath("$.shortTitle", is("Updated title")));
	}

	@Test
	public void updateFavById_failure_userNotFoundReturns404() throws Exception {

		this.mockMvc
			.perform(
				patch("/4")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(updatedSecondFav))
			)
			.andExpect(status().isNotFound());
	}

	@Test
	public void updateFavById_failure_userNotFoundReturnsNotFoundErrorMessage() throws Exception {

		this.mockMvc
			.perform(
				patch("/4")
					.contentType(MediaType.APPLICATION_JSON)
					.content(jsonObjectMapper.writeValueAsString(updatedSecondFav))
			)
			.andExpect(status().reason(containsString("Fav with ID of 4 was not found!")));
	}

}
