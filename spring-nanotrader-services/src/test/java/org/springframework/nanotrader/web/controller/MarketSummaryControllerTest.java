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

public class MarketSummaryControllerTest {

	private static MockMvc mockMvc;
	
	@BeforeClass
	public static void setup() {
		String warRootDir = "src/webapps";
		boolean isClasspathRelative = false;
		mockMvc = annotationConfigSetup(WebConfig.class, AppConfig.class, ServiceTestConfiguration.class)
				.activateProfiles("test").configureWebAppRootDir(warRootDir, isClasspathRelative).build();
	}

	@Test
	public void getMarketSummaryJson() throws Exception {
		mockMvc.perform(get("/marketSummary").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().type(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.tradeStockIndexAverage").value(ServiceTestConfiguration.MARKET_INDEX.doubleValue()))
				.andExpect(jsonPath("$.tradeStockIndexOpenAverage").value(ServiceTestConfiguration.MARKET_OPENING.doubleValue()))
				.andExpect(jsonPath("$.tradeStockIndexVolume").value(ServiceTestConfiguration.MARKET_VOLUME.doubleValue()))
				.andExpect(jsonPath("$.percentGain").value(new BigDecimal(184).doubleValue()))
				.andDo(print());
	}
	
}
