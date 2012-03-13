package org.springframework.nanotrader.web.controller;

import javax.annotation.Resource;

import org.springframework.nanotrader.service.domain.MarketSummary;
import org.springframework.nanotrader.service.domain.PortfolioSummary;
import org.springframework.nanotrader.service.support.TradingServiceFacade;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 *  Provides JSON based REST api to Market Summary
 *  
 *  @author Brian Dussault 
 *  @author
 */
@Controller
public class MarketSummaryController {
	@Resource
	private TradingServiceFacade tradingServiceFacade;
	
	@RequestMapping(value = "/marketSummary", method = RequestMethod.GET)
	@ResponseBody
	public MarketSummary findMarketSummary() {
		return tradingServiceFacade.findMarketSummary();
	}

}
