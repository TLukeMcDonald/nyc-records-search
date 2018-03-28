package com.example.springbootmicroservicewrapperwithtests.features;

import com.example.springbootmicroservicewrapperwithtests.models.Fav;
import com.example.springbootmicroservicewrapperwithtests.repositories.FavRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Stream;

import static io.restassured.RestAssured.when;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.core.Is.is;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class FavsApiFeatureTest {

    @Autowired
    private FavRepository favRepository;

    @Before
    public void setUp() {
        favRepository.deleteAll();
    }

    @After
    public void tearDown() {
        favRepository.deleteAll();
    }

    @Test
    public void shouldAllowFullCrudFunctionalityForAUser() throws Exception {

        Fav firstFav = new Fav(
                "20151222104",
                "Final Amendments to OER Program Rule and Brownfield Incentive Grant Rule"
        );

        Fav secondFav = new Fav(
                "20131010106",
                "BOARD MEETINGS"
        );


        Stream.of(firstFav, secondFav)
                .forEach(fav -> {
                    favRepository.save(fav);
                });

        when()
                .get("http://localhost:8080/favs")
                .then()
                .statusCode(is(200))
                .and()
                .body(containsString("20151222104"))
                .and()
                .body(containsString("20131010106"));

        when()
                .get("http://localhost:8080/favs/" + secondFav.getId())
                .then()
                .statusCode(is(200))
                .body(containsString("20131010106"))
                .body(containsString("BOARD MEETINGS"));

        when()
                .delete("http://localhost:8080/favs/" + secondFav.getId())
                .then()
                .statusCode(is(200));
    }


}
