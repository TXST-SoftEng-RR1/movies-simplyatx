package com.simplyatx.movies.config;

import com.ulisesbocchio.jasyptspringboot.annotation.EncryptablePropertySource;
import org.springframework.context.annotation.Configuration;

@Configuration
@EncryptablePropertySource("application.properties")
public class JasyptConfig {
}
