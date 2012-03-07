package org.springframework.nanotrader.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.nanotrader.service.domain.Holding;
import org.springframework.nanotrader.service.support.TradingServiceFacade;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *  Provides JSON based REST api to Holdings repository
 *  
 *  @author Brian Dussault 
 *  @author
 */

@Controller
public class HoldingController {
	private static Logger log = LoggerFactory.getLogger(HoldingController.class);

	@Resource
	private TradingServiceFacade tradingServiceFacade;
	
	@RequestMapping(value = "/{accountId}/holding/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Holding find(@PathVariable( "id" ) final Integer id ) {
		Holding holdingResponse = new Holding();
		holdingResponse = tradingServiceFacade.findHolding(id);
		return holdingResponse;
	}
	
	@RequestMapping(value = "/{accountId}/holding/", method = RequestMethod.GET)
	@ResponseBody
	public List<Holding> findByAccountId(@PathVariable( "accountId" ) final Integer accountId ) {
		List<Holding> holdingResponse = tradingServiceFacade.findHoldingsByAccountId(accountId);
		return holdingResponse;
	}

	@RequestMapping(value = "/{accountId}/holding/", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.CREATED )
	public void save(@RequestBody Holding holdingRequest) {
		tradingServiceFacade.saveHolding(holdingRequest);
	}

	@RequestMapping(value = "/{accountId}/holding/", method = RequestMethod.PUT)
	@ResponseStatus( HttpStatus.OK )
	public void update(@RequestBody Holding holdingRequest) {
		tradingServiceFacade.updateHolding(holdingRequest);
		
	}
	
}
