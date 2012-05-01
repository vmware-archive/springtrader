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
package org.springframework.nanotrader.service.support;

import java.util.List;
import java.util.Map;

import org.springframework.nanotrader.data.service.TradingService;
import org.springframework.nanotrader.service.domain.Account;
import org.springframework.nanotrader.service.domain.Accountprofile;
import org.springframework.nanotrader.service.domain.CollectionResult;
import org.springframework.nanotrader.service.domain.Holding;
import org.springframework.nanotrader.service.domain.HoldingSummary;
import org.springframework.nanotrader.service.domain.MarketSummary;
import org.springframework.nanotrader.service.domain.Order;
import org.springframework.nanotrader.service.domain.PortfolioSummary;
import org.springframework.nanotrader.service.domain.Quote;

/**
 * @author Gary Russell
 * 
 */
public interface TradingServiceFacade {
	
	Map<String, Object> login(String username, String password);


	void logout(String authtoken);

	Accountprofile findAccountProfile(Integer id);
	
	Accountprofile findAccountprofileByUserId(String username);

	Integer saveAccountProfile(Accountprofile accountProfileRequest);

	void updateAccountProfile(Accountprofile accountProfileRequest, String username);
	
	Integer saveOrder(Order order, boolean synch);

	Integer saveOrderDirect(Order order);
	
	Holding findHolding(Integer id, Integer accountId);

	CollectionResult findHoldingsByAccountId(Integer accountId, Integer page, Integer pageSize);

	Order findOrder(Integer orderId, Integer accountId);

	void updateOrder(Order orderRequest);

	CollectionResult findOrders(Integer accountId, String status, Integer page, Integer pageSize);

	Quote findQuoteBySymbol(String symbol);

	Account findAccount(Integer id);

	PortfolioSummary findPortfolioSummary(Integer accountId);

	MarketSummary findMarketSummary();
	

	Accountprofile findAccountprofileByAuthtoken(String token);
	
	HoldingSummary findHoldingSummary(Integer accountId);
	
	void setTradingService(TradingService tradingService);
}
