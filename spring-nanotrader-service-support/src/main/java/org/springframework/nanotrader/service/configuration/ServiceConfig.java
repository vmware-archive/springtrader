package org.springframework.nanotrader.service.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.Profile;

/**
 * Java configuration for the application's spring managed beans
 * 
 * @author Brian Dussault
 * @author
 */

@Configuration
@ImportResource({"classpath:/META-INF/spring/cache/spring-nanotrader-service-support.xml"})
@Profile("production")
public class ServiceConfig   {
	
	

	
}
