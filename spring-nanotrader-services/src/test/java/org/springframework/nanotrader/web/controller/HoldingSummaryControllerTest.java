package org.springframework.nanotrader.web.controller;

import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.nanotrader.web.configuration.ServiceTestConfiguration;


/**
 *  HoldingSummaryTest tests the Holding Summary  REST api
 *  
 *  @author Brian Dussault 
 *  @author
 */
public class HoldingSummaryControllerTest extends AbstractSecureControllerTest {
	
	@Test
	public void getHoldingSummaryJson() throws Exception {
		mockMvc.perform(get("/account/"+ ServiceTestConfiguration.ACCOUNT_ID + "/holdingSummary").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().type(MediaType.APPLICATION_JSON))
				.andDo(print());
	}

}
