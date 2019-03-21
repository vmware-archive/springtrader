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
				.andExpect(content().mimeType(MediaType.APPLICATION_JSON))
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
