package org.springframework.nanotrader.web.controller;

import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;

import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.nanotrader.web.configuration.ServiceTestConfiguration;

/**
 *  PortfollioSummaryControllerTest tests the PortfolioSummary  REST api
 *  
 *  @author Brian Dussault 
 *  @author
 */
public class PortfollioSummaryControllerTest extends AbstractSecureControllerTest {


	@Test
	public void getPortfolioSummaryJson() throws Exception {
		mockMvc.perform(get("/account/"+ ServiceTestConfiguration.ACCOUNT_ID + "/portfolioSummary").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().type(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.numberOfHoldings").value(ServiceTestConfiguration.HOLDING_COUNT))
				.andExpect(jsonPath("$.totalBasis").value(ServiceTestConfiguration.BASIS.doubleValue()))
				.andExpect(jsonPath("$.totalMarketValue").value(ServiceTestConfiguration.MARKET_VALUE.doubleValue()))
				.andExpect(jsonPath("$.gain").value(new BigDecimal("149.85").doubleValue()))
				.andDo(print());
	}
	

}
