/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
	private static Integer QUANTITY = 200;

	@Test
	public void getHoldingByIdJson() throws Exception {
		mockMvc.perform(get("/account/" + ServiceTestConfiguration.ACCOUNT_ID + "/holding/100").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(content().mimeType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.holdingid").value(ServiceTestConfiguration.HOLDING_ID))
				.andExpect(jsonPath("$.accountAccountid").value(ServiceTestConfiguration.ACCOUNT_ID))
				.andExpect(jsonPath("$.purchasedate").value(ServiceTestConfiguration.DATE))
				.andExpect(jsonPath("$.quote.symbol").value(ServiceTestConfiguration.SYMBOL))
				.andExpect(jsonPath("$.purchaseprice").value(PURCHASE_PRICE))
				.andExpect(jsonPath("$.quantity").value(QUANTITY))
				.andDo(print());
	}
	
	@Test
	public void getHoldingByAccountIdNoRecordsFoundJson() throws Exception {
		mockMvc.perform(get("/account/600/holdings").accept(MediaType.APPLICATION_JSON)).andExpect(status().isUnauthorized())
				.andExpect(content().mimeType(MediaType.APPLICATION_JSON)).andDo(print());
	}
	
	@Test
	public void getHoldingByHoldingIdIdNoRecordsFoundJson() throws Exception {
		mockMvc.perform(get("/account/" + ServiceTestConfiguration.ACCOUNT_ID + "/holding/300").accept(MediaType.APPLICATION_JSON)).andExpect(status().isNotFound())
				.andExpect(content().mimeType(MediaType.APPLICATION_JSON)).andDo(print());
	}
	
	@Test
	public void getHoldingsByAccountIdJson() throws Exception {
		mockMvc.perform(get("/account/" + ServiceTestConfiguration.ACCOUNT_ID + "/holdings").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(content().mimeType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.results.[0].holdingid").value(ServiceTestConfiguration.HOLDING_ID))
				.andExpect(jsonPath("$.results.[0].accountAccountid").value(ServiceTestConfiguration.ACCOUNT_ID))
				.andExpect(jsonPath("$.results.[0].purchasedate").value(ServiceTestConfiguration.DATE))
				.andExpect(jsonPath("$.results.[0].quote.symbol").value(ServiceTestConfiguration.SYMBOL))
				.andExpect(jsonPath("$.results.[0].purchaseprice").value(PURCHASE_PRICE))
				.andExpect(jsonPath("$.results.[0].quantity").value(QUANTITY)).andDo(print());
	}
	
}
