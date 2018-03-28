package com.example.springbootmicroservicewrapperwithtests.models;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity @Table(name = "FAVS")
public class Fav {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "REQUEST_ID")
    private String userFav;

    @Column(name = "SHORT_TITLE")
    private String shortTitle;


    public Fav(String userFav, String shortTitle) {
        this.userFav = userFav;
        this.shortTitle = shortTitle;

    }
}
