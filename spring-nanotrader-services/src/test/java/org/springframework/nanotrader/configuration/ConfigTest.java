package org.springframework.nanotrader.configuration;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.nanotrader.service.configuration.AppConfig;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;
import org.springsource.nanotrader.configuration.ServiceConfig;

/**
 *  Loads app config and service config to validate overall configurations. WebConfig is excluded here since
 *  it requires a servlet engine which is mocked in the controller tests (see src/test/java/org.springsource.nanotrader.controller.*)
 *  
 *  @author Brian Dussault 
 *  @author
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { AppConfig.class, ServiceConfig.class }, loader = AnnotationConfigContextLoader.class)
public class ConfigTest {
	@Test
	public final void springContextIsInstantiatedSuccessfully() { 

	}
}
