package org.springframework.nanotrader.web.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.nanotrader.web.security.SecurityUtil;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;

/**
 * Security configuration used to protect REST API
 * @author Brian Dussault
 *
 */

@Configuration
@ImportResource({ "classpath:/META-INF/spring/spring-nanotrader-services/security.xml" })
public class SecurityConfig {

	@Bean
	public AuthenticationEntryPoint entryPoint() {
		return new Http403ForbiddenEntryPoint();
	}
	
	@Bean 
	SecurityUtil securityUtil() { 
		return new SecurityUtil();
	}
}
