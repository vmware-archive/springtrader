package org.springframework.nanotrader.web.controller;

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

public class AccountControllerTest {

private static MockMvc mockMvc;
	private static String DATE = "2012-02-20T17:35:42.904+0000";

	@BeforeClass
	public static void setup() {
		String warRootDir = "src/webapps";
		boolean isClasspathRelative = false;
		mockMvc = annotationConfigSetup(WebConfig.class, AppConfig.class, ServiceTestConfiguration.class)
				.activateProfiles("test").configureWebAppRootDir(warRootDir, isClasspathRelative).build();
	}

	@Test
	public void getQuoteBySymbolJson() throws Exception {
		mockMvc.perform(get("/account/500").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().type(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.accountid").value(ServiceTestConfiguration.ACCOUNT_ID))
				.andExpect(jsonPath("$.creationdate").value(DATE))
				.andExpect(jsonPath("$.openbalance").value(ServiceTestConfiguration.ACCOUNT_OPEN_BALANCE.doubleValue()))
				.andExpect(jsonPath("$.logoutcount").value(ServiceTestConfiguration.LOGOUT_COUNT.intValue()))
				.andExpect(jsonPath("$.balance").value(ServiceTestConfiguration.ACCOUNT_BALANCE.doubleValue()))
				.andExpect(jsonPath("$.lastlogin").value(DATE))
				.andExpect(jsonPath("$.logincount").value(ServiceTestConfiguration.LOGIN_COUNT))
				.andDo(print());
	}
}
