package org.springframework.nanotrader.asynch.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

/**
 * Java configuration for the application's spring managed beans
 * 
 * @author Kashyap Parikh
 */

@Configuration
@ImportResource({"classpath:/META-INF/spring/applicationContext.xml",
	"classpath:/META-INF/spring/applicationContext-jpa.xml",
	"classpath:/META-INF/spring/integration/amqp-inbound-context.xml"})

public class IntegrationConfig {

}
