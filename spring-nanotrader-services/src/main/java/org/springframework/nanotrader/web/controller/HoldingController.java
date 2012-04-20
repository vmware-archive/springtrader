package org.springframework.nanotrader.web.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.nanotrader.service.domain.CollectionResult;
import org.springframework.nanotrader.service.domain.Holding;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *  Provides JSON based REST api to Holdings repository
 *  
 *  @author Brian Dussault 
 *  @author
 */

@Controller
public class HoldingController extends BaseController {

	@RequestMapping(value = "/account/{accountId}/holding/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Holding find(@PathVariable( "id" ) final Integer id, @PathVariable( "accountId" ) final Integer accountId ) {
		Holding holdingResponse = new Holding();
		this.getSecurityUtil().checkAccount(accountId);
		holdingResponse =  getTradingServiceFacade().findHolding(id, this.getSecurityUtil().getAccountFromPrincipal());
		return holdingResponse;
	}
	
	@RequestMapping(value = "/account/{accountId}/holdings", method = RequestMethod.GET)
	@ResponseBody
	public CollectionResult findByAccountId(@PathVariable( "accountId" ) final Integer accountId, 
										 @RequestParam(value="page", required=false) Integer page, 
										 @RequestParam(value="pageSize", required=false) Integer pageSize) {
		this.getSecurityUtil().checkAccount(accountId);
		return getTradingServiceFacade().findHoldingsByAccountId(accountId, page, pageSize);
		
	}

	
	@RequestMapping(value = "/account/{accountId}/holding", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void post() {
	}
	
	@RequestMapping(value = "/account/{accountId}/holding/{id}", method = RequestMethod.PUT)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void put() {
		
	}
	
	@RequestMapping(value = "/account/{accountId}/holding/{id}", method = RequestMethod.DELETE)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void delete() {
		
	}
	
	
}
