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
package org.springframework.nanotrader.web.exception;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.nanotrader.web.configuration.ServiceTestConfiguration;
import org.springframework.nanotrader.web.controller.AbstractSecureControllerTest;

/**
 *  GlobalExceptionHandlerTest uses spring-mvc-test framework to mock the servlet container and ensures
 *  the global error handling configuration is correct.
 *  
 *  @author Brian Dussault 
 *  @author
 */

public class GlobalExceptionHandlerTest extends AbstractSecureControllerTest {
	
	@Test
	public void ExceptionHandlerTest() throws Exception  { 
		//cause a type mismtach and invoke global error handling
		mockMvc.perform(get("/accountProfile/not-a-number"))
		.andExpect(status()
		.isBadRequest())
		.andExpect(content().mimeType(MediaType.APPLICATION_JSON))
		.andExpect(jsonPath("$.detail", containsString("An error has occured while processing the request: Failed to convert value of type 'java.lang.String' to required type 'java.lang.Integer'")) )
		.andDo(print());
	}	
	
	@Test
	public void getAccountProfileByIdJsonNoRecordFound() throws Exception {
		mockMvc.perform(get("/accountProfile/900" + ServiceTestConfiguration.NOT_A_VALID_PROFILE).accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isUnauthorized())
				.andExpect(content().mimeType(MediaType.APPLICATION_JSON))
				.andDo(print());
	}
	

	
}
