package com.example.springbootmicroservicewrapperwithtests.features;

import com.example.springbootmicroservicewrapperwithtests.models.Fav;
import com.example.springbootmicroservicewrapperwithtests.repositories.FavRepository;
import org.hamcrest.Matcher;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Stream;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static io.restassured.http.ContentType.JSON;
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
    public void createFavCrudFunctionality() throws Exception {
        //Test creating a Fav
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
    }

    @Test
    public void getAllFavsCrudFunctionality() throws Exception {
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

        // Test getting all favs
        when()
                .get("http://localhost:8080/favs")
                .then()
                .statusCode(is(200))
                .and()
                .body(containsString("20151222104"))
                .and()
                .body(containsString("20131010106"));
    }

    @Test
    public void getOneFavsCrudFunctionality() throws Exception {
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

        // Test getting a fav by id
        when()
                .get("http://localhost:8080/favs/" + secondFav.getId())
                .then()
                .statusCode(is(200))
                .body(containsString("20131010106"))
                .body(containsString("BOARD MEETINGS"));
    }

    @Test
    public void updateFavsFunctionality() throws Exception {
        //creates a Fav
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


        // Test updating a Fav
        secondFav.setUserFav("987654321");
        given()
                .contentType(JSON)
                .and()
                .body(secondFav)
        .when()
                .patch("http://localhost:8080/favs")
                .then()
                .statusCode(is(200))
                .and().body(containsString("987654321"));

    }
    //////////////////////////////////////////////////////////

//// Test updating a user
//secondUser.setFirstName("changed_name");
//
//    given()
//	.contentType(JSON)
//	.and().body(secondUser)
//.when()
//	.patch("http://localhost:8080/users/" + secondUser.getId())
//            .then()
//	.statusCode(is(200))
//            .and().body(containsString("changed_name"));
//


    @Test
    public void deleteFavsCrudFunctionality() throws Exception {
        //Test creating a Fav
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

        // Test deleting a single fav
        when()
                .delete("http://localhost:8080/favs/" + secondFav.getId())
                .then()
                .statusCode(is(200));
    }

    

}
