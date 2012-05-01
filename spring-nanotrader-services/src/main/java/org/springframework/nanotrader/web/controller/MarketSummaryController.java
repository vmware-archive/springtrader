package org.springframework.nanotrader.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.nanotrader.service.domain.MarketSummary;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;


/**
 *  Provides JSON based REST api to Market Summary
 *  
 *  @author Brian Dussault 
 *  @author
 */
@Controller
public class MarketSummaryController extends BaseController {

	@RequestMapping(value = "/marketSummary", method = RequestMethod.GET)
	@ResponseBody
	public MarketSummary findMarketSummary() {
		return  getTradingServiceFacade().findMarketSummary();
	}

	@RequestMapping(value = "/marketSummary", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void post() {
	}
	
	
}
