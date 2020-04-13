package com.simplyatx.movies.controllers;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FeedbackControllerTest {

    FeedbackController control;
    @BeforeEach
    void setUp() {
        control = new FeedbackController();
    }

    @AfterEach
    void tearDown() {

    }

    @Test
    void main() {
    }

    @Test
    void sendEmail() {
        String res = control.sendEmail("lanlan150711@gmail.com","test again", "SimplyATXTest");
        assertEquals(res,"Succeed");


    }
}