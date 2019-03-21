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
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.server.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.nanotrader.data.service.TradingServiceImpl;
import org.springframework.nanotrader.web.configuration.ServiceTestConfiguration;
import org.springframework.util.FileCopyUtils;


/**
 *  OrderControllerTest tests the Order  REST api
 *  
 *  @author Brian Dussault 
 *  @author
 */


public class OrderControllerTest extends AbstractSecureControllerTest {

	@Test
	public void getOrderByIdJson() throws Exception {
		mockMvc.perform(get("/account/" + ServiceTestConfiguration.ACCOUNT_ID + "/order/999/").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().mimeType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.orderid").value(ServiceTestConfiguration.ORDER_ID))
				.andExpect(jsonPath("$.completiondate").value(ServiceTestConfiguration.DATE))
				.andExpect(jsonPath("$.opendate").value(ServiceTestConfiguration.DATE))
				.andExpect(jsonPath("$.orderfee").value(TradingServiceImpl.DEFAULT_ORDER_FEE.doubleValue()))
				.andExpect(jsonPath("$.price").value(ServiceTestConfiguration.ORDER_PRICE.intValue()))
				.andExpect(jsonPath("$.quantity").value(ServiceTestConfiguration.ORDER_QUANTITY.intValue()))
				.andExpect(jsonPath("$.ordertype").value(ServiceTestConfiguration.ORDER_TYPE_BUY))
				.andExpect(jsonPath("$.orderstatus").value(ServiceTestConfiguration.ORDER_STATUS_CLOSED))				
				.andExpect(jsonPath("$.quote.symbol").value(ServiceTestConfiguration.SYMBOL))
				.andExpect(jsonPath("$.quote.companyname").value(ServiceTestConfiguration.COMPANY_NAME))
				.andDo(print());
	}

	@Test
	public void getOrderByIdNoRecordsFoundJson() throws Exception {
		mockMvc.perform(get("/account/" + ServiceTestConfiguration.ACCOUNT_ID + "/order/"+ ServiceTestConfiguration.ORDER_ID).accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound())
				.andDo(print());
	}
	
	@Test
	public void getOrders() throws Exception {
		mockMvc.perform(get("/account/" + ServiceTestConfiguration.ACCOUNT_ID + "/orders").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().mimeType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.results.[0].orderid").value(ServiceTestConfiguration.ORDER_ID))
				.andExpect(jsonPath("$.results.[0].completiondate").value(ServiceTestConfiguration.DATE))
				.andExpect(jsonPath("$.results.[0].opendate").value(ServiceTestConfiguration.DATE))
				.andExpect(jsonPath("$.results.[0].orderfee").value(TradingServiceImpl.DEFAULT_ORDER_FEE.doubleValue()))
				.andExpect(jsonPath("$.results.[0].price").value(ServiceTestConfiguration.ORDER_PRICE.intValue()))
				.andExpect(jsonPath("$.results.[0].quantity").value(ServiceTestConfiguration.ORDER_QUANTITY.intValue()))
				.andExpect(jsonPath("$.results.[0].ordertype").value(ServiceTestConfiguration.ORDER_TYPE_BUY))
				.andExpect(jsonPath("$.results.[0].orderstatus").value(ServiceTestConfiguration.ORDER_STATUS_CLOSED))				
				.andExpect(jsonPath("$.results.[0].quote.symbol").value(ServiceTestConfiguration.SYMBOL))
				.andExpect(jsonPath("$.results.[0].quote.companyname").value(ServiceTestConfiguration.COMPANY_NAME))
				.andDo(print());
	}
	
	
	@Test
	public void getOrdersNoRecordsFoundJson() throws Exception {
		mockMvc.perform(get("/account/3/orders").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isUnauthorized());
				
	}

	@Test
	public void getClosedOrders() throws Exception {
		mockMvc.perform(get("/account/" + ServiceTestConfiguration.ACCOUNT_ID + "/orders").accept(MediaType.APPLICATION_JSON).param("status", "closed"))
				.andExpect(status().isOk())
				.andExpect(content().mimeType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.results.[0].orderid").value(ServiceTestConfiguration.ORDER_ID))
				.andExpect(jsonPath("$.results.[0].completiondate").value(ServiceTestConfiguration.DATE))
				.andExpect(jsonPath("$.results.[0].opendate").value(ServiceTestConfiguration.DATE))
				.andExpect(jsonPath("$.results.[0].orderfee").value(TradingServiceImpl.DEFAULT_ORDER_FEE.doubleValue()))
				.andExpect(jsonPath("$.results.[0].price").value(ServiceTestConfiguration.ORDER_PRICE.intValue()))
				.andExpect(jsonPath("$.results.[0].quantity").value(ServiceTestConfiguration.ORDER_QUANTITY.intValue()))
				.andExpect(jsonPath("$.results.[0].ordertype").value(ServiceTestConfiguration.ORDER_TYPE_BUY))
				.andExpect(jsonPath("$.results.[0].orderstatus").value(ServiceTestConfiguration.ORDER_STATUS_CLOSED))				
				.andExpect(jsonPath("$.results.[0].quote.symbol").value(ServiceTestConfiguration.SYMBOL))
				.andExpect(jsonPath("$.results.[0].quote.companyname").value(ServiceTestConfiguration.COMPANY_NAME))
				.andDo(print());
	}

	
	@Test
	public void createOrderBuyJson() throws Exception {
		byte[] jsonRequest = FileCopyUtils.copyToByteArray(new ClassPathResource("create-order.json").getFile());
		mockMvc.perform(
				post("/account/" + ServiceTestConfiguration.ACCOUNT_ID + "/order").accept(MediaType.APPLICATION_JSON).body(jsonRequest)
						.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isCreated()) // HTTP 201 - Created
				.andDo(print());
	}

	@Test
	public void createOrderSellJson() throws Exception {
		byte[] jsonRequest = FileCopyUtils.copyToByteArray(new ClassPathResource("create-order-sell.json").getFile());
		mockMvc.perform(
				post("/account/" + ServiceTestConfiguration.ACCOUNT_ID + "/order").accept(MediaType.APPLICATION_JSON).body(jsonRequest)
						.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isCreated()) // HTTP 201 - Created
				.andDo(print());
	}


}
