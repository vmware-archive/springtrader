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

import static org.springframework.test.web.server.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.nanotrader.web.configuration.ServiceTestConfiguration;
import org.springframework.util.FileCopyUtils;

public class AuthenticationControllerTest extends AbstractSecureControllerTest {

	@Test
	public void loginJson() throws Exception {
		byte[] jsonRequest = FileCopyUtils
				.copyToByteArray(new ClassPathResource("login.json").getFile());
		mockMvc.perform(
				post("/login")
						.accept(MediaType.APPLICATION_JSON).body(jsonRequest)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated()) // HTTP 201 - Created
				.andExpect(jsonPath("$.authToken").value(ServiceTestConfiguration.AUTH_TOKEN))
				.andExpect(jsonPath("$.accountid").value(ServiceTestConfiguration.ACCOUNT_ID.intValue()))
				.andDo(print());
	}

	
	@Test
	public void failedloginJson() throws Exception {
		byte[] jsonRequest = FileCopyUtils
				.copyToByteArray(new ClassPathResource("failed-login.json").getFile());
		mockMvc.perform(
				post("/login")
						.accept(MediaType.APPLICATION_JSON).body(jsonRequest)
						.contentType(MediaType.APPLICATION_JSON))
						.andExpect(status().isUnauthorized()) 
						.andDo(print());
	}

	@Test
	public void serviceLogout() throws Exception {
		mockMvc.perform(
				get("/logout")
						.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()) // HTTP 200
				.andDo(print());
	}
}
