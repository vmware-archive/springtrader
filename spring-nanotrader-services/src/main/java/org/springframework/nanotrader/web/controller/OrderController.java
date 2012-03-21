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
public class OrderController  extends BaseController {
	private static Logger log = LoggerFactory.getLogger(OrderController.class);

	@Resource
	private TradingServiceFacade tradingServiceFacade;

	@RequestMapping(value = "/account/{accountId}/order", method = RequestMethod.GET)
	@ResponseBody
	public List<Order> findOrders(@PathVariable( "accountId" ) final Integer accountId, @RequestParam(value="status", required=false) final String status) {
		this.getSecurityUtil().checkAccount(accountId); //verify that the account on the path is the same as the authenticated user
		List<Order> responseOrders = tradingServiceFacade.findOrders(accountId, status);
		return responseOrders;
	}

	
	@RequestMapping(value = "/account/{accountId}/order/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Order findOrder(@PathVariable( "accountId" ) final Integer accountId, @PathVariable( "id" ) final Integer orderId ) {
		if (log.isDebugEnabled()) { 
			log.debug("OrderController.findOrder: accountId=" + accountId + " orderId=" + orderId);
		}
		this.getSecurityUtil().checkAccount(accountId);
		Order responseOrder = tradingServiceFacade.findOrder(orderId, accountId);
		return responseOrder;
	}
	
	
	@RequestMapping(value = "/account/{accountId}/order", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.CREATED )
	public ResponseEntity<String> save(@RequestBody Order orderRequest, @PathVariable( "accountId" ) final Integer accountId,
										UriComponentsBuilder builder) {
		this.getSecurityUtil().checkAccount(accountId);
		orderRequest.setAccountid(accountId);
		Integer orderId = tradingServiceFacade.saveOrder(orderRequest, true);
		HttpHeaders responseHeaders = new HttpHeaders();   
		responseHeaders.setLocation(builder.path("/account/"+ accountId + "/order/{id}").buildAndExpand(orderId).toUri());
		return new ResponseEntity<String>(responseHeaders, HttpStatus.CREATED);
	}

	
	@RequestMapping(value = "/account/{accountId}/order/asynch", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.ACCEPTED )
	public void saveAsynch(@RequestBody Order orderRequest, @PathVariable( "accountId" ) final Integer accountId) {
		orderRequest.setAccountid(accountId);
		tradingServiceFacade.saveOrder(orderRequest, false);
	}
	
	@RequestMapping(value = "/account/{accountId}/order/{id}", method = RequestMethod.PUT)
	@ResponseStatus( HttpStatus.OK )
	public void update( @RequestBody Order orderRequest, @PathVariable( "accountId" ) final Integer accountId, @PathVariable( "id" ) final Integer orderId) {
		this.getSecurityUtil().checkAccount(accountId); //verify that the  account on the path is the same as the authenticated user
		orderRequest.setAccountid(this.getSecurityUtil().getAccountFromPrincipal());
		orderRequest.setOrderid(orderId);
		tradingServiceFacade.updateOrder(orderRequest);
	}
	
	
	@RequestMapping(value = "/account/{accountId}/order/{id}", method = RequestMethod.DELETE)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void delete() {
		
	}
	
}
