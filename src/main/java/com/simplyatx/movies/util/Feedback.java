package com.simplyatx.movies.util;

import com.simplyatx.movies.services.JasyptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

/**
 *
 */
public class Feedback implements FeedbackWorkflow {
    private static final String USERNAME = "admin@simplyatx.com";
    private Properties props;
    private Session session;
    private JasyptService jasyptService;

    ApplicationContext applicationContext;

    public void setApplicationContext(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

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
     * Name is blank as the user chose to provide anonymous feedback
     *
     * @param feedbackMessage
     * @param feedbackSubject
     * @return
     */
    @Override
    public String initAnonymousWorkflow(String feedbackMessage, String feedbackSubject) {
        return sendEmailToAdmin("admin@simplyatx.com", feedbackSubject, feedbackMessage);
    }

    /**
     *
     * @param feedbackName
     * @param feedbackEmail
     * @param feedbackMessage
     * @param feedbackSubject
     * @return
     */
    @Override
    public String initNonAnonymousWorkflow(String feedbackName, String feedbackEmail, String feedbackSubject, String feedbackMessage){
        String retVal_1 = sendEmailToAdmin(USERNAME, feedbackSubject, feedbackMessage);
        String retVal_2 = sendEmailToUser(feedbackName, feedbackEmail, feedbackSubject, feedbackMessage);

        if (retVal_1.equals("Succeed") && retVal_2.equals("Succeed")) {
            return "Succeed";
        } else {
            return "Fail";
        }
    }

    /**
     *
     * @param feedbackEmail
     * @param feedbackSubject
     * @param feedbackMessage
     * @return
     */
    public String sendEmailToAdmin(String feedbackEmail, String feedbackSubject, String feedbackMessage) {
        return sendEmail(feedbackEmail, feedbackSubject, feedbackMessage);
    }

    /**
     *
     * @param feedbackName
     * @param feedbackEmail
     * @param feedbackSubject
     * @param feedbackMessage
     * @return
     */
    private String sendEmailToUser(String feedbackName, String feedbackEmail, String feedbackSubject, String feedbackMessage) {
        return sendEmail(feedbackEmail, feedbackSubject, this.buildMessage(feedbackName));
    }

    /**
     *
     * @param feedbackEmail
     * @param feedbackSubject
     * @param feedbackMessage
     * @return
     * @throws UnsupportedEncodingException
     * @throws MessagingException
     */
    private String sendEmail(String feedbackEmail, String feedbackSubject, String feedbackMessage) {
        final String decodeEmail;

        try {
            decodeEmail = URLDecoder.decode(feedbackEmail, StandardCharsets.UTF_8.toString());

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
            return "Succeed";
        } catch (UnsupportedEncodingException | MessagingException e) {
            e.printStackTrace();
            return "Fail";
        }
    }

    /**
     * If the user is not anonymous (i.e., they provided an email address), then we reply to the user.
     * This method builds the body of the response message we send to the user.
     *
     * @param name
     * @return
     */
    public String buildMessage(String name) {
        StringBuilder stringBuilder = new StringBuilder(200);
        stringBuilder.append("Hey there ")
                .append(name)
                .append(", \n")
                .append("We received your feedback; thank you!\n")
                .append("We are working on it and will get back to you.\n")
                .append("Regards - the SimplyATX team");
        return stringBuilder.toString();
    }
}
