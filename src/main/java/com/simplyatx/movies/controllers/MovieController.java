package com.simplyatx.movies.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
public class MovieController {
    Logger logger = Logger.getLogger(MovieController.class.getName());
    @Value("${TARGET:World}")
    String message;

    @GetMapping("/hello")
    String hello() {
        return "Graphs says Hello " + message + "!";
    }

}
