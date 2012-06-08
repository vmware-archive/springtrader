package org.springframework.nanotrader.service.support.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.Profile;
import org.springframework.nanotrader.service.configuration.ServiceConfig;

/**
 * Java configuration for the application's spring managed beans
 * 
 * @author Kashyap Parikh
 * @author Brian Dussault
 */

/*
 * Component scan excludes ServiceConfig.class (and the associated spring-nanotrader-service-support.xml) 
 * from the spring-nanotrader-service-support project, since spring-nanotrader-asynch 
 * does not need gemfire configured and we are already including the application context 
 * files in this configuration with @ImportResource.
 */

@Profile ("test")
@Configuration
@ComponentScan(basePackages="org.springframework.nanotrader.service" )
@ImportResource({ "classpath:/META-INF/spring/cache/spring-nanotrader-service-support.xml" })
public class IntegrationTestConfig {
	public IntegrationTestConfig() { 
		
	}
}
