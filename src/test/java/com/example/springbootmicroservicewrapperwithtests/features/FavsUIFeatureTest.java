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

import static com.codeborne.selenide.CollectionCondition.size;
import static com.codeborne.selenide.Condition.*;
import static com.codeborne.selenide.Selenide.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class FavsUIFeatureTest {

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
        firstFav = favRepository.save(firstFav);
        Long firstUserId = firstFav.getId();

        Fav secondFav = new Fav(
                "20131010106",
                "BOARD MEETINGS"
        );
        secondFav = favRepository.save(secondFav);
        Long secondUserId = secondFav.getId();

        System.setProperty("selenide.browser", "Chrome");
        System.setProperty("selenide.headless", "true");

        // Visit the UI in a browser
        open("http://localhost:3000");

        // There should only be two favs
        $$("[data-fav-display]").shouldHave(size(2));

        // Test that all data shows up for each fav
        $("#fav-" + firstUserId + "-fav-name").shouldHave(text("someone"));
        $("#fav-" + firstUserId + "-first-name").shouldHave(text("Ima"));

        $("#fav-" + secondUserId + "-fav-name").shouldHave(text("someone_else"));
        $("#fav-" + secondUserId + "-first-name").shouldHave(text("Someone"));

        // Visit the new fav page
        $("#new-fav-link").click();

        // Make sure the link worked and the form is now showing
        $("#new-fav-form").should(appear);

        // Add a new fav
        $("#new-fav-fav-name").sendKeys("third_fav");
        $("#new-fav-first-name").sendKeys("Third");
        $("#new-fav-submit").click();

        // Make sure we're now on the favs page again
        $("#favs-wrapper").should(appear);

        // Now there should be three Users
        $$("[data-fav-display]").shouldHave(size(3));

        refresh();

        // Now there should be three Users again after the refresh
        $$("[data-fav-display]").shouldHave(size(3));

        // Check that the data is showing up for the third Fav
        Long thirdUserId = secondUserId + 1;
        $("#fav-" + thirdUserId + "-fav-name").shouldHave(text("third_fav"));
        $("#fav-" + thirdUserId + "-first-name").shouldHave(text("Third"));

        // Test Deleting the first fav
        $("#fav-" + firstUserId).should(exist);
        $$("[data-fav-display]").shouldHave(size(3));

        $("#delete-fav-" + firstUserId).click();
        $("#fav-" + firstUserId).shouldNot(exist);

        $$("[data-fav-display]").shouldHave(size(2));

    }

}
