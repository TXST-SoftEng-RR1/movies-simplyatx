package com.simplyatx.movies.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

/**
 * A service class to return the decrypted property for Zoho email
 */
@Service
public class JasyptService {
    @Value("${zoho.encrypted.property}")
    private String property;

    public String getProperty() {
        return property;
    }

    public String getPasswordUsingEnvironment(Environment environment) {
        return environment.getProperty("zoho.encrypted.property");
    }
}
