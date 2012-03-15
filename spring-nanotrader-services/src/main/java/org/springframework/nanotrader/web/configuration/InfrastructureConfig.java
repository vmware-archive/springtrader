package org.springframework.nanotrader.web.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.Profile;

@Configuration
@ImportResource({"classpath:/META-INF/spring/integration/amqp-outbound-context.xml" })
@Profile("production")
public class InfrastructureConfig {

}
