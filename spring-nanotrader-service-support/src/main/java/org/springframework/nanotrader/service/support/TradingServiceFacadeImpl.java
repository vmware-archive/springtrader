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

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.nanotrader.service.domain.Accountprofile;
import org.springframework.nanotrader.service.domain.Holding;
import org.springframework.nanotrader.service.domain.Quote;
import org.springframework.nanotrader.service.TradingService;
import org.springframework.nanotrader.service.domain.Order;
import org.springframework.nanotrader.service.support.exception.NoRecordsFoundException;
import org.springframework.stereotype.Service;

/**
 * Facade that, generally, delegates directly to a {@link TradingService},
 * after mapping from service domain to data domain. For {@link #saveOrder(Order, boolean)},
 * and option for synch/asynch processing is provided.
 * @author Gary Russell
 *
 */
@Service
public class TradingServiceFacadeImpl implements TradingServiceFacade {

	private static Logger log = LoggerFactory
			.getLogger(TradingServiceFacadeImpl.class);

	private String ORDER_MAPPING = "order";

	private static String HOLDING_MAPPING = "holding";

	private static String QUOTE_MAPPING = "quote";

	@Resource
	private TradingService tradingService;

	@Resource
	private Mapper mapper;

	@Autowired(required=false)
	private OrderGateway orderGateway;

	public Integer saveOrder(Order orderRequest, boolean synch) {
		if (synch) {
			return saveOrderDirect(orderRequest);
		}
		else {
			orderGateway.sendOrder(orderRequest);
			return null;
		}
	}

	public Integer saveOrderDirect(Order orderRequest) {
		org.springframework.nanotrader.domain.Order order = new org.springframework.nanotrader.domain.Order();
		mapper.map(orderRequest, order, ORDER_MAPPING);
		tradingService.saveOrder(order);
		return order.getOrderid();
	}

	public Accountprofile findAccountProfile(Integer id) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServiceFacade.findAccountProfile: id=" + id);
		}
		org.springframework.nanotrader.domain.Accountprofile accountProfile = tradingService.findAccountProfile(id);
		Accountprofile accountProfileResponse = new Accountprofile();
		if (accountProfile == null) {
			throw new NoRecordsFoundException();
		}

		mapper.map(accountProfile, accountProfileResponse, "accountProfile");
		if (log.isDebugEnabled()) {
			log.debug("TradingServiceFacade.find - after service call. Payload is: "
					+ accountProfileResponse);
		}

		return accountProfileResponse;
	}

	public void saveAccountProfile(Accountprofile accountProfileRequest) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServiceFacade.saveAccountProfile:"
					+ accountProfileRequest.toString());
		}
		org.springframework.nanotrader.domain.Accountprofile accountProfile = new org.springframework.nanotrader.domain.Accountprofile();
		mapper.map(accountProfileRequest, accountProfile);
		tradingService.saveAccountProfile(accountProfile);
	}

	public void updateAccountProfile(Accountprofile accountProfileRequest) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServiceFacade.updateAccountProfile:"
					+ accountProfileRequest.toString());
		}
		org.springframework.nanotrader.domain.Accountprofile accountProfile = new org.springframework.nanotrader.domain.Accountprofile();
		mapper.map(accountProfileRequest, accountProfile);
		tradingService.updateAccountProfile(accountProfile);
	}

	public Holding findHolding(Integer id) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServiceFacade.findHolding: id=" + id);
		}
		Holding holdingResponse = new Holding();
		org.springframework.nanotrader.domain.Holding holding = tradingService.findHolding(id);
		if (holding == null) {
			throw new NoRecordsFoundException();
		}
		mapper.map(holding, holdingResponse);
		if (log.isDebugEnabled()) {
			log.debug("TradingServiceFacade.findHolding - after service call. Payload is: " + holdingResponse);
		}
		return holdingResponse;
	}

	public void updateHolding(Holding holdingRequest) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServiceFacade.updateHolding:" + holdingRequest.toString());
		}
		org.springframework.nanotrader.domain.Holding holding = new org.springframework.nanotrader.domain.Holding();
		mapper.map(holdingRequest, holding);

		tradingService.updateHolding(holding);
	}

	public void saveHolding(Holding holdingRequest) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServiceFacade.saveHolding:" + holdingRequest.toString());
		}
		org.springframework.nanotrader.domain.Holding holding = new org.springframework.nanotrader.domain.Holding();
		mapper.map(holdingRequest, holding);
		tradingService.saveHolding(holding);
	}

	public Order findOrder(Integer orderId) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServiceFacade.findOrder: orderId=" + orderId);
		}
		org.springframework.nanotrader.domain.Order order =  tradingService.findOrder(orderId);
		if (order == null) {
			throw new NoRecordsFoundException();
		}
		Order responseOrder = new Order();
		mapper.map(order, responseOrder, ORDER_MAPPING);
		return responseOrder;
	}

	public void updateOrder(Order orderRequest) {
		if (log.isDebugEnabled()) {
			log.debug("OrderController.update:" + orderRequest.toString());
		}
		org.springframework.nanotrader.domain.Order order = new org.springframework.nanotrader.domain.Order();
		mapper.map(orderRequest, order, ORDER_MAPPING);
		tradingService.updateOrder(order);
	}

	public List<Order> findOrders(Integer accountId, String status) {
		if (log.isDebugEnabled()) {
			log.debug("OrderController.findOrders: accountId=" + accountId + " status" + status);
		}
		List<org.springframework.nanotrader.domain.Order> orders = null;
		if (status != null) {
			orders = tradingService.findOrdersByStatus(accountId, status); //get by status
		} else {
			orders = tradingService.findOrders(accountId); //get all orders
		}
		List<Order> responseOrders = new ArrayList<Order>();
		if (orders == null || orders.size() == 0 ) {
			throw new NoRecordsFoundException();
		}
		for(org.springframework.nanotrader.domain.Order o: orders) {
			Order order = new Order();
			mapper.map(o, order, ORDER_MAPPING);
			responseOrders.add(order);
		}
		return responseOrders;
	}

	public List<Holding> findHoldingsByAccountId(Integer accountId) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServiceFacade.findHoldingsByAccount: id=" + accountId);
		}
		List<Holding> holdingResponse = new ArrayList<Holding>();
		List<org.springframework.nanotrader.domain.Holding> holdings = tradingService.findHoldingsByAccountId(accountId);
		if (holdings == null ||  holdings.size() == 0) {
			throw new NoRecordsFoundException();
		}
		for(org.springframework.nanotrader.domain.Holding h: holdings) {
			Holding holding = new Holding();
			mapper.map(h, holding, HOLDING_MAPPING);
			holdingResponse.add(holding);
		}


		if (log.isDebugEnabled()) {
			log.debug("TradingServiceFacade.findHoldingsByAccountId completed");
		}

		return holdingResponse;
	}

	public Quote findQuoteBySymbol(String symbol) {
		if (log.isDebugEnabled()) {
			log.debug("QuoteController.findQuote: quoteId=" + symbol);
		}
		org.springframework.nanotrader.domain.Quote quote = tradingService.findQuoteBySymbol(symbol);
		if (quote == null) {
			throw new NoRecordsFoundException();
		}
		Quote responseQuote = new Quote();
		mapper.map(quote, responseQuote, QUOTE_MAPPING);
		if (log.isDebugEnabled()) {
			log.debug("QuoteController.findQuote: completed successfully.");
		}
		return responseQuote;
	}

	public static interface OrderGateway {

		void sendOrder(Order order);
	}
}
