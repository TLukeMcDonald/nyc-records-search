package com.example.favsapi.repositories;

import com.example.favsapi.models.Fav;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class FavRepositoryTest {

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private FavRepository favRepository;

	@Before
	public void setUp() {
		Fav firstFav = new Fav(
			"fav1",
			"some title"
		);

		Fav secondFav = new Fav(
			"fav2",
			"some other title"
		);

		entityManager.persist(firstFav);
		entityManager.persist(secondFav);
		entityManager.flush();
	}

	@Test
	public void findAll_returnsAllFavs() {
		List<Fav> favsFromDb = favRepository.findAll();

		assertThat(favsFromDb.size(), is(2));
	}

	@Test
	public void findAll_returnsUserFav() {
		List<Fav> favsFromDb = favRepository.findAll();
		String secondUsersUserFav = favsFromDb.get(1).getUserFav();

		assertThat(secondUsersUserFav, is("fav2"));
	}

	@Test
	public void findAll_returnsShortTitle() {
		List<Fav> favsFromDb = favRepository.findAll();
		String secondUsersShortTitle = favsFromDb.get(1).getShortTitle();

		assertThat(secondUsersShortTitle, is("some other title"));
	}



}
