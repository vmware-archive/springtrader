package org.springframework.nanotrader.web.controller;

import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.nanotrader.web.configuration.ServiceTestConfiguration;

/**
 *  QuoteControllerTest tests the Quote  REST api
 *  
 *  @author Brian Dussault 
 *  @author
 */

public class QuoteControllerTest extends AbstractSecureControllerTest {


	@Test
	public void getQuoteBySymbolJson() throws Exception {
		mockMvc.perform(get("/quote/VMW").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().type(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.quoteid").value(ServiceTestConfiguration.QUOTE_ID))
				.andExpect(jsonPath("$.high").value(ServiceTestConfiguration.HIGH.doubleValue()))
				.andExpect(jsonPath("$.open1").value(ServiceTestConfiguration.OPEN.doubleValue()))
				.andExpect(jsonPath("$.volume").value(ServiceTestConfiguration.VOLUME.intValue()))
				.andExpect(jsonPath("$.price").value(ServiceTestConfiguration.CURRENT_PRICE.doubleValue()))
				.andExpect(jsonPath("$.companyname").value(ServiceTestConfiguration.COMPANY_NAME))
				.andDo(print());
	}
	
	@Test
	public void getQuoteBySymbolNoRecordsFoundJson() throws Exception {
		mockMvc.perform(get("/quote/NOT_A_SYMBOL").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound())
				.andDo(print());
	}
}
