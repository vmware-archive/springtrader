package org.springframework.nanotrader.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.util.UriComponentsBuilder;

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
	private TradingServiceFacade tradingServiceFacade;

	@RequestMapping(value = "/{id}/order", method = RequestMethod.GET)
	@ResponseBody
	public List<Order> findOrders(@PathVariable( "id" ) final Integer accountId, @RequestParam(value="status", required=false) final String status) {
		List<Order> responseOrders = tradingServiceFacade.findOrders(accountId, status);
		return responseOrders;
	}
	
	
	@RequestMapping(value = "/{id}/order/{orderId}", method = RequestMethod.GET)
	@ResponseBody
	public Order findOrder(@PathVariable( "id" ) final Integer accountId, @PathVariable( "orderId" ) final Integer orderId ) {
		if (log.isDebugEnabled()) { 
			log.debug("OrderController.findOrder: accountId=" + accountId + " orderId=" + orderId);
		}
		Order responseOrder = tradingServiceFacade.findOrder(orderId);
		return responseOrder;
	}
	
	
	@RequestMapping(value = "/{id}/order", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.CREATED )
	public ResponseEntity<String> save(@RequestBody Order orderRequest, @PathVariable( "id" ) final Integer accountId,
										UriComponentsBuilder builder) {
		orderRequest.setAccountId(accountId);
		Integer orderId = tradingServiceFacade.saveOrder(orderRequest, true);
		HttpHeaders responseHeaders = new HttpHeaders();   
		responseHeaders.setLocation(builder.path("/"+ accountId + "/order/{id}").buildAndExpand(orderId).toUri());
		return new ResponseEntity<String>(responseHeaders, HttpStatus.CREATED);
	}

	
	@RequestMapping(value = "/{id}/order/asynch", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.ACCEPTED )
	public void saveAsynch(@RequestBody Order orderRequest, @PathVariable( "id" ) final Integer accountId) {
		orderRequest.setAccountId(accountId);
		tradingServiceFacade.saveOrder(orderRequest, false);
	}
	
	@RequestMapping(value = "/{id}/order", method = RequestMethod.PUT)
	@ResponseStatus( HttpStatus.OK )
	public void update( @RequestBody Order orderRequest) {
		tradingServiceFacade.updateOrder(orderRequest);
		
	}
	
}
