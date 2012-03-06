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

import javax.annotation.Resource;

import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.nanotrader.service.TradingService;
import org.springframework.nanotrader.service.domain.Order;
import org.springframework.stereotype.Service;

/**
 * @author Gary Russell
 *
 */
@Service
public class TradingServiceFacadeImpl implements TradingServiceFacade {

	private String ORDER_MAPPING = "order";
	
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

	public static interface OrderGateway {
		
		void sendOrder(Order order);
	}
}
