package org.springframework.nanotrader.web.controller;

import javax.annotation.Resource;

import org.springframework.nanotrader.service.domain.PortfolioSummary;
import org.springframework.nanotrader.service.support.TradingServiceFacade;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *  Provides JSON based REST api to Portfolio Summary
 *  
 *  @author Brian Dussault 
 *  @author
 */
@Controller
public class PortfolioSummaryController extends BaseController {
	@Resource
	private TradingServiceFacade tradingServiceFacade;
	
	@RequestMapping(value = "/{accountId}/portfolioSummary", method = RequestMethod.GET)
	@ResponseBody
	public PortfolioSummary find(@PathVariable( "accountId" ) final Integer accountId ) {
		this.getSecurityUtil().checkAccount(accountId);
		return tradingServiceFacade.findPortfolioSummary(accountId);
	
	}
}
