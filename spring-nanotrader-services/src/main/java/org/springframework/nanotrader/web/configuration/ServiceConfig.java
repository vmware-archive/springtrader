package org.springframework.nanotrader.web.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.Profile;

/**
 * Java configuration which imports xml based configuration which was generated
 * by Spring ROO.
 * 
 * @author Brian Dussault
 * @author
 */

@Configuration
@ImportResource({ "classpath:/META-INF/spring/applicationContext.xml",
		"classpath:/META-INF/spring/applicationContext-jpa.xml",  "classpath:/META-INF/spring/integration/amqp-outbound-context.xml" })
@Profile("production")
public class ServiceConfig {

}
