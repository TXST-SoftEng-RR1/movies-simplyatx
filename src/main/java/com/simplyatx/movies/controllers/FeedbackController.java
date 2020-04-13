package com.simplyatx.movies.controllers;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeedbackController{
    final  String username = "lanlan150711@gmail.com";
    final  String password = "aaletetnbkdsplof";
    Properties prop;
    Session session;
    Message message;

    public void setProperties() {
        prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");
    }

    public void setSession() {
        session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
    }

    @GetMapping("/feedback")
    public String sendEmail(String feedBackEmail, String feedbackMessage, String feedbackSubject){
        try {
            setProperties();
            setSession();
            message = new MimeMessage(session);
            message.setFrom(new InternetAddress("SimplyATX <admin@simplyatx.com>"));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(feedBackEmail)
            );
            message.setSubject(feedbackSubject);
            message.setText(feedbackMessage);

            Transport.send(message);

            return "Succeed";

        } catch (MessagingException e) {
            e.printStackTrace();
            return "Fail";
        }
    }


    public static void main(String[] args) {
        FeedbackController control = new FeedbackController();
        control.sendEmail();
    }




}
