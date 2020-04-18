package com.simplyatx.movies.controllers;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.junit.jupiter.api.Assertions.*;

/**
 * TODO: add details
 */
@ExtendWith(SpringExtension.class)
@TestPropertySource(properties = {"jasypt.encryptor.password = yVK6h1Sl2"})
@WebMvcTest(FeedbackController.class)
class FeedbackControllerTest {
    @Autowired
    ApplicationContext applicationContext;
    @Autowired
    private MockMvc mvc;
    @MockBean
    FeedbackController feedbackController;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {

    }

    /**
     * Mock the connection to localhost:8080 and send a GET reqeust
     */
    @Test
    void integrationTest_sendEmail_StatusOk() {
        MultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
        requestParams.add("feedbackEmail", "bss64%40txstate.edu");
        requestParams.add("feedbackMessage", "sendEmail");
        requestParams.add("feedbackSubject", "Autogentest");

        try {
            int result = mvc.perform(get("/feedback")
                    .header("host", "localhost:8080")
                    .params(requestParams))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andReturn().getResponse().getStatus();
            assertEquals(200, result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}