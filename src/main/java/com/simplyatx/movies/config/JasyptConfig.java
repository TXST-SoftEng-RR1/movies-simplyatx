package com.simplyatx.movies.config;

import com.ulisesbocchio.jasyptspringboot.annotation.EncryptablePropertySource;
import org.springframework.context.annotation.Configuration;

/**
 * Jasypt encryption configuration class, using Spring Boot and application.properties
 */
@Configuration
@EncryptablePropertySource("application.properties")
public class JasyptConfig {
}
