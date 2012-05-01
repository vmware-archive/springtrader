package org.springframework.nanotrader.web.configuration;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.nanotrader.service.configuration.ServiceConfig;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

/**
 *  Loads app config and service config to validate overall configurations. WebConfig is excluded here since
 *  it requires a servlet engine which is mocked in the controller tests (see src/test/java/org.springsource.nanotrader.controller.*)
 *  
 *  @author Brian Dussault 
 *  @author
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { ServiceConfig.class }, loader = AnnotationConfigContextLoader.class)
public class ConfigTest {
	@Test
	public final void springContextIsInstantiatedSuccessfully() { 

	}
}
