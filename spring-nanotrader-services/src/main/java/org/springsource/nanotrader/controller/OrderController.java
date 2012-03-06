package org.springsource.nanotrader.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.nanotrader.service.TradingService;
import org.springframework.nanotrader.service.domain.Order;
import org.springframework.nanotrader.service.support.TradingServiceFacade;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springsource.nanotrader.exception.NoRecordsFoundException;

/**
 *  Provides JSON based REST api to Order repository
 *  
 *  @author Brian Dussault 
 *  @author
 */
@Controller
public class OrderController {
	private static Logger log = LoggerFactory.getLogger(OrderController.class);

	@Resource
	private TradingService tradingService;

	@Resource
	private Mapper mapper;

	@Resource
	private TradingServiceFacade tradingServiceFacade;

	private String ORDER_MAPPING = "order";
	@RequestMapping(value = "/{id}/order", method = RequestMethod.GET)
	@ResponseBody
	public List<Order> findOrders(@PathVariable( "id" ) final Integer accountId, @RequestParam(value="status", required=false) final String status)  throws NoRecordsFoundException {
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
	
	
	@RequestMapping(value = "/{id}/order/{orderId}", method = RequestMethod.GET)
	@ResponseBody
	public Order findOrder(@PathVariable( "id" ) final Integer accountId, @PathVariable( "orderId" ) final Integer orderId )  throws NoRecordsFoundException {
		if (log.isDebugEnabled()) { 
			log.debug("OrderController.findOrder: accountId=" + accountId + " orderId=" + orderId);
		}
		org.springframework.nanotrader.domain.Order order = tradingService.findOrder(orderId);
		if (order == null) { 
			throw new NoRecordsFoundException();
		} 
		Order responseOrder = new Order();
		mapper.map(order, responseOrder, ORDER_MAPPING);
	
		return responseOrder;
	}
	
	

	@RequestMapping(value = "/{id}/order", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.CREATED )
	public void save(@RequestBody Order orderRequest, @PathVariable( "id" ) final Integer accountId) {
		if (log.isDebugEnabled()) { 
			log.debug("OrderController.save:" + orderRequest.toString());
		}
		orderRequest.setAccountId(accountId);
		Integer orderId = tradingServiceFacade.saveOrder(orderRequest, true);
		// if asynch, pass in false and null will be returned
		// response status ACCEPTED
		// else return URL to order in Location: header
		if (log.isDebugEnabled()) { 
			log.debug("OrderController.save:" + orderId);
		}
	}

	@RequestMapping(value = "/{id}/order", method = RequestMethod.PUT)
	@ResponseStatus( HttpStatus.OK )
	public void update( @RequestBody Order orderRequest) {
		if (log.isDebugEnabled()) { 
			log.debug("OrderController.update:" + orderRequest.toString());
		}
		org.springframework.nanotrader.domain.Order order = new org.springframework.nanotrader.domain.Order();
		mapper.map(orderRequest, order, ORDER_MAPPING);
		tradingService.updateOrder(order);
		
	}
	
}
