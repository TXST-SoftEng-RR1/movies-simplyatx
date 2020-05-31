package com.filmsreel.movies.util;

public interface FeedbackWorkflow {
    String initAnonymousWorkflow(String feedbackSubject, String feedbackMessage);
    String initNonAnonymousWorkflow(String feedbackName, String feedbackEmail, String feedbackMessage, String feedbackSubject);
}
