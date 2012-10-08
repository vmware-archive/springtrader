/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
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
 * AccountControllerTest tests the Account REST api 
 * 
 * @author Brian Dussault
 * @author
 */

public class AccountControllerTest extends AbstractSecureControllerTest {
	private static String DATE = "2012-02-20";
	
	@Test
	public void getQuoteBySymbolJson() throws Exception {
		mockMvc.perform(get("/account/" + ServiceTestConfiguration.ACCOUNT_ID).accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().mimeType(MediaType.APPLICATION_JSON))
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
