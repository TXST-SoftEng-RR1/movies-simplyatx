package com.simplyatx.movies.controllers;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

import com.simplyatx.movies.services.JasyptService;
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
    private static final String USERNAME = "admin@simplyatx.com";
    private Properties props;
    private Session session;
    private JasyptService jasyptService;

    @Autowired
    ApplicationContext applicationContext;


    private void setProperties() {
        System.setProperty("jasypt.encryptor.password", "yVK6h1Sl2");
        jasyptService = applicationContext.getBean(JasyptService.class);

        props = new Properties();
        props.put("mail.smtp.host", "smtp.zoho.com");
        props.put("mail.smtp.port", 465); // 587 is TLS, 465 is SSL
        props.put("mail.smtp.auth", "true");
        props.put("mail.debug", "true");
        props.put("mail.smtp.ssl.enable", true);
    }

    private void setSession() {
        session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(USERNAME, jasyptService.getProperty());
                    }
                });
    }

    /**
     * Send an email using the ZOHO SMTP mail host
     * @param feedbackEmail
     * @param feedbackMessage
     * @param feedbackSubject
     * @return
     */
    @GetMapping("/feedback")
    public String sendEmail(String feedbackEmail, String feedbackMessage, String feedbackSubject){
        try {
            final String decodeEmail = URLDecoder.decode(feedbackEmail, StandardCharsets.UTF_8.toString());
            setProperties();
            setSession();
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("admin@simplyatx.com"));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(decodeEmail)
            );
            message.setSubject(feedbackSubject);
            message.setText(feedbackMessage);
            Transport.send(message);
            System.out.println("here");
            return "Succeed";
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
            return "Fail";
        }
    }

    public static void main(String...args) {
        FeedbackController feedbackController = new FeedbackController();
        feedbackController.sendEmail("bss64@txstate.edu", "test", "test");
    }
}
