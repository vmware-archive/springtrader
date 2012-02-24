package org.springsource.nanotrader.controller;

import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.server.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.server.setup.MockMvcBuilders.annotationConfigSetup;

import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.nanotrader.configuration.ServiceTestConfiguration;
import org.springframework.test.web.server.MockMvc;
import org.springframework.util.FileCopyUtils;
import org.springsource.nanotrader.configuration.AppConfig;
import org.springsource.nanotrader.configuration.WebConfig;


/**
 *  HoldingControllerTest tests the Holding's  REST api
 *  
 *  @author Brian Dussault 
 *  @author
 */


public class HoldingControllerTest {
	private static Integer PURCHASE_PRICE = 50000;
	private static String PURCHASE_DATE = "2012-02-20T17:35:42.904+0000";
	private static Integer QUANTITY = 200;

	private static MockMvc mockMvc;

	@BeforeClass
	public static void setup() {
		String warRootDir = "src/webapps";
		boolean isClasspathRelative = false;
		mockMvc = annotationConfigSetup(WebConfig.class, AppConfig.class, ServiceTestConfiguration.class)
				.activateProfiles("test").configureWebAppRootDir(warRootDir, isClasspathRelative).build();
	}

	@Test
	public void getHoldingByIdJson() throws Exception {
		mockMvc.perform(get("/400/holding/100").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(content().type(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.holdingid").value(ServiceTestConfiguration.HOLDING_ID))
				.andExpect(jsonPath("$.accountAccountid").value(ServiceTestConfiguration.ACCOUNT_ID))
				.andExpect(jsonPath("$.purchasedate").value(PURCHASE_DATE))
				.andExpect(jsonPath("$.quoteSymbol").value(ServiceTestConfiguration.SYMBOL))
				.andExpect(jsonPath("$.purchaseprice").value(PURCHASE_PRICE))
				.andExpect(jsonPath("$.quantity").value(QUANTITY)).andDo(print());
	}
	
	@Test
	public void getHoldingByAccountIdNoRecordsFoundJson() throws Exception {
		mockMvc.perform(get("/600/holding/").accept(MediaType.APPLICATION_JSON)).andExpect(status().isNotFound())
				.andExpect(content().type(MediaType.APPLICATION_JSON)).andDo(print());
	}
	
	@Test
	public void getHoldingByHoldingIdIdNoRecordsFoundJson() throws Exception {
		mockMvc.perform(get("/600/holding/300").accept(MediaType.APPLICATION_JSON)).andExpect(status().isNotFound())
				.andExpect(content().type(MediaType.APPLICATION_JSON)).andDo(print());
	}
	
	@Test
	public void getHoldingsByAccountIdJson() throws Exception {
		mockMvc.perform(get("/400/holding/").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(content().type(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.[0].holdingid").value(ServiceTestConfiguration.HOLDING_ID))
				.andExpect(jsonPath("$.[0].accountAccountid").value(ServiceTestConfiguration.ACCOUNT_ID))
				.andExpect(jsonPath("$.[0].purchasedate").value(PURCHASE_DATE))
				.andExpect(jsonPath("$.[0].quoteSymbol").value(ServiceTestConfiguration.SYMBOL))
				.andExpect(jsonPath("$.[0].purchaseprice").value(PURCHASE_PRICE))
				.andExpect(jsonPath("$.[0].quantity").value(QUANTITY)).andDo(print());
	}

	@Test
	public void createHoldingJson() throws Exception {
		byte[] jsonRequest = FileCopyUtils.copyToByteArray(new ClassPathResource("create-holding.json").getFile());
		mockMvc.perform(
				post("/400/holding/").accept(MediaType.APPLICATION_JSON).body(jsonRequest)
						.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isCreated()) // HTTP 201 - Created
				.andDo(print());
	}

	@Test
	public void createHoldingUnsupportedMediaType() throws Exception {
		byte[] jsonRequest = FileCopyUtils.copyToByteArray(new ClassPathResource("create-holding.json").getFile());
		mockMvc.perform(post("/400/holding/").body(jsonRequest)).andExpect(status().is(415)) // unsupported media type
				.andDo(print());
	}

	

	
	@Test
	public void updateHoldingJson() throws Exception {
		byte[] jsonRequest = FileCopyUtils.copyToByteArray(new ClassPathResource("update-holding.json").getFile());
		mockMvc.perform(
				put("/400/holding/").accept(MediaType.APPLICATION_JSON).body(jsonRequest)
						.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andDo(print());
	}

}
