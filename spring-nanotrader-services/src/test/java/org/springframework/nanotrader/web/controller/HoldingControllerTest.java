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
 *  HoldingControllerTest tests the Holding's  REST api
 *  
 *  @author Brian Dussault 
 *  @author
 */


public class HoldingControllerTest extends AbstractSecureControllerTest {
	private static Integer PURCHASE_PRICE = 50000;
	private static String PURCHASE_DATE = "2012-02-20";
	private static Integer QUANTITY = 200;

	@Test
	public void getHoldingByIdJson() throws Exception {
		mockMvc.perform(get("/account/" + ServiceTestConfiguration.ACCOUNT_ID + "/holding/100").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(content().type(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.holdingid").value(ServiceTestConfiguration.HOLDING_ID))
				.andExpect(jsonPath("$.accountAccountid").value(ServiceTestConfiguration.ACCOUNT_ID))
				.andExpect(jsonPath("$.purchasedate").value(PURCHASE_DATE))
				.andExpect(jsonPath("$.quote.symbol").value(ServiceTestConfiguration.SYMBOL))
				.andExpect(jsonPath("$.purchaseprice").value(PURCHASE_PRICE))
				.andExpect(jsonPath("$.quantity").value(QUANTITY))
				.andDo(print());
	}
	
	@Test
	public void getHoldingByAccountIdNoRecordsFoundJson() throws Exception {
		mockMvc.perform(get("/account/600/holding").accept(MediaType.APPLICATION_JSON)).andExpect(status().isUnauthorized())
				.andExpect(content().type(MediaType.APPLICATION_JSON)).andDo(print());
	}
	
	@Test
	public void getHoldingByHoldingIdIdNoRecordsFoundJson() throws Exception {
		mockMvc.perform(get("/account/" + ServiceTestConfiguration.ACCOUNT_ID + "/holding/300").accept(MediaType.APPLICATION_JSON)).andExpect(status().isNotFound())
				.andExpect(content().type(MediaType.APPLICATION_JSON)).andDo(print());
	}
	
	@Test
	public void getHoldingsByAccountIdJson() throws Exception {
		mockMvc.perform(get("/account/" + ServiceTestConfiguration.ACCOUNT_ID + "/holding").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(content().type(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.[0].holdingid").value(ServiceTestConfiguration.HOLDING_ID))
				.andExpect(jsonPath("$.[0].accountAccountid").value(ServiceTestConfiguration.ACCOUNT_ID))
				.andExpect(jsonPath("$.[0].purchasedate").value(PURCHASE_DATE))
				.andExpect(jsonPath("$.[0].quote.symbol").value(ServiceTestConfiguration.SYMBOL))
				.andExpect(jsonPath("$.[0].purchaseprice").value(PURCHASE_PRICE))
				.andExpect(jsonPath("$.[0].quantity").value(QUANTITY)).andDo(print());
	}
	
}
