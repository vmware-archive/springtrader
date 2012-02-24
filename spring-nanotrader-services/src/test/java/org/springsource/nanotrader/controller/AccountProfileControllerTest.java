package org.springsource.nanotrader.controller;

import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.server.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.server.setup.MockMvcBuilders.annotationConfigSetup;

import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.nanotrader.configuration.ServiceTestConfiguration;
import org.springframework.test.web.server.MockMvc;
import org.springframework.util.FileCopyUtils;
import org.springsource.nanotrader.configuration.AppConfig;
import org.springsource.nanotrader.configuration.WebConfig;

/**
 *  AccountProfileControllerTest tests the Account Profile's REST api
 *  
 *  @author Brian Dussault 
 *  @author
 */

public class AccountProfileControllerTest {

	private static MockMvc mockMvc;
	
	@BeforeClass
	public static void setup() {
		String warRootDir = "src/webapps";
		boolean isClasspathRelative = false;
		mockMvc = annotationConfigSetup(WebConfig.class, AppConfig.class, ServiceTestConfiguration.class)
				.activateProfiles("test").configureWebAppRootDir(warRootDir, isClasspathRelative).build();
	}

	@Test
	public void getAccountProfileByIdJson() throws Exception {
		mockMvc.perform(get("/accountProfile/400").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().type(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.userid").value(ServiceTestConfiguration.USER_ID))
				.andExpect(jsonPath("$.profileid").value(ServiceTestConfiguration.PROFILE_ID))
				.andExpect(jsonPath("$.email").value(ServiceTestConfiguration.EMAIL))
				.andExpect(jsonPath("$.address").value(ServiceTestConfiguration.ADDRESS))
				.andExpect(jsonPath("$.fullname").value(ServiceTestConfiguration.FULL_NAME))
				.andExpect(jsonPath("$.creditcard").value(ServiceTestConfiguration.CC_NUMBER))
				.andDo(print());
	}
	


	@Test
	public void createAccountProfileJson() throws Exception {
		byte[] jsonRequest = FileCopyUtils.copyToByteArray(new ClassPathResource("create-account-profile.json").getFile());
		mockMvc.perform(post("/accountProfile/").accept(MediaType.APPLICATION_JSON)
				.body(jsonRequest).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated())  //HTTP 201 - Created
				.andDo(print());
	}
	
	@Test
	public void createAccountProfileUnsupportedMediaType() throws Exception {
		byte[] jsonRequest = FileCopyUtils.copyToByteArray(new ClassPathResource("create-account-profile.json").getFile());
		mockMvc.perform(post("/accountProfile/")
				.body(jsonRequest))
				.andExpect(status().is(415)) //unsupported media type
				.andDo(print());
	}
	
	
	@Test
	public void updateAccountProfileJson() throws Exception {
		byte[] jsonRequest = FileCopyUtils.copyToByteArray(new ClassPathResource("update-account-profile.json").getFile());
		mockMvc.perform(put("/accountProfile/").accept(MediaType.APPLICATION_JSON)
				.body(jsonRequest).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andDo(print());
	}

}
