package com.simplyatx.movies.controllers;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

import com.simplyatx.movies.services.JasyptService;
import com.simplyatx.movies.util.Feedback;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Lanlan Liu
 *
 */
@RestController
public class FeedbackController{
    Feedback feedback;

    @Autowired
    ApplicationContext applicationContext;

    @GetMapping("/feedback")
    public String nonAnonymousWorkflow(String feedbackName, String feedbackEmail, String feedbackSubject, String feedbackMessage){
        feedback = new Feedback();
        feedback.setApplicationContext(applicationContext);
        return feedback.initNonAnonymousWorkflow(feedbackName, feedbackEmail, feedbackSubject, feedbackMessage);
    }

    @GetMapping("/anonFeedback")
    public String anonymousWorkflow(String feedbackSubject, String feedbackMessage) {
        feedback = new Feedback();
        feedback.setApplicationContext(applicationContext);
        return feedback.initAnonymousWorkflow(feedbackSubject, feedbackMessage);
    }
}
