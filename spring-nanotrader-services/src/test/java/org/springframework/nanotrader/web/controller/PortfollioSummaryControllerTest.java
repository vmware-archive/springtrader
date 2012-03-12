package org.springframework.nanotrader.web.controller;

import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.server.setup.MockMvcBuilders.annotationConfigSetup;

import java.math.BigDecimal;

import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.nanotrader.service.configuration.AppConfig;
import org.springframework.nanotrader.web.configuration.ServiceTestConfiguration;
import org.springframework.nanotrader.web.configuration.WebConfig;
import org.springframework.test.web.server.MockMvc;

public class PortfollioSummaryControllerTest {

private static MockMvc mockMvc;
	
	@BeforeClass
	public static void setup() {
		String warRootDir = "src/webapps";
		boolean isClasspathRelative = false;
		mockMvc = annotationConfigSetup(WebConfig.class, AppConfig.class, ServiceTestConfiguration.class)
				.activateProfiles("test").configureWebAppRootDir(warRootDir, isClasspathRelative).build();
	}

	@Test
	public void getAccountSummaryJson() throws Exception {
		mockMvc.perform(get("/2/portfolioSummary").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().type(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.numberOfHoldings").value(ServiceTestConfiguration.HOLDING_COUNT))
				.andExpect(jsonPath("$.totalBasis").value(ServiceTestConfiguration.BASIS.doubleValue()))
				.andExpect(jsonPath("$.totalMarketValue").value(ServiceTestConfiguration.MARKET_VALUE.doubleValue()))
				.andExpect(jsonPath("$.gain").value(new BigDecimal(149.85000000000002).doubleValue()))
				.andDo(print());
	}
	

}
