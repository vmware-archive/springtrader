package org.springframework.nanotrader.web.exception;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.server.setup.MockMvcBuilders.annotationConfigSetup;

import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.nanotrader.service.configuration.AppConfig;
import org.springframework.nanotrader.web.configuration.ServiceTestConfiguration;
import org.springframework.nanotrader.web.configuration.WebConfig;
import org.springframework.test.web.server.MockMvc;

/**
 *  GlobalExceptionHandlerTest uses spring-mvc-test framework to mock the servlet container and ensures
 *  the global error handling configuration is correct.
 *  
 *  @author Brian Dussault 
 *  @author
 */

public class GlobalExceptionHandlerTest {
	private static MockMvc mockMvc;
	
	@BeforeClass 
	public static void setup() {
		String warRootDir = "src/webapps";
		boolean isClasspathRelative = false;
		mockMvc =
				annotationConfigSetup(WebConfig.class, AppConfig.class, ServiceTestConfiguration.class)
				.activateProfiles("test")
				.configureWebAppRootDir(warRootDir, isClasspathRelative)
				.build(); 
	}
	
	@Test
	public void ExceptionHandlerTest() throws Exception  { 
		//cause a type mismtach and invoke global error handling
		mockMvc.perform(get("/accountProfile/not-a-number"))
		.andExpect(status()
		.isBadRequest())
		.andExpect(content().type(MediaType.APPLICATION_JSON))
		.andExpect(jsonPath("$.detail", containsString("An error has occured while processing the request: Failed to convert value of type 'java.lang.String' to required type 'java.lang.Integer'")) )
		.andDo(print());
	}	
	
	@Test
	public void getAccountProfileByIdJsonNoRecordFound() throws Exception {
		mockMvc.perform(get("/accountProfile/900" + ServiceTestConfiguration.NOT_A_VALID_PROFILE).accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound())
				.andExpect(content().type(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.detail", containsString("No records found for the specified criteria")) )
				.andDo(print());
	}
	

	
}
