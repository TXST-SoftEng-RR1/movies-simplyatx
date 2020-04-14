package com.simplyatx.movies.controllers;

import com.simplyatx.movies.services.JasyptService;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.hamcrest.Matchers.containsString;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

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