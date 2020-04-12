package com.simplyatx.movies.controllers;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class FeedbackController{

    public static void main(String[] args) {

        final String username = "lanlan150711@gmail.com";
        final String password = "aaletetnbkdsplof";

        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("SimplyATX <admin@simplyatx.com>"));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse("lanlan150711@gmail.com")
            );
            message.setSubject("Testing Gmail TLS");
            message.setText("testing");

            Transport.send(message);

            System.out.println("Succeed");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}
