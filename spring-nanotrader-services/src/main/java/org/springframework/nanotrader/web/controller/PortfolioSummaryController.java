package org.springframework.nanotrader.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.nanotrader.service.domain.PortfolioSummary;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *  Provides JSON based REST api to Portfolio Summary
 *  
 *  @author Brian Dussault 
 */
@Controller
public class PortfolioSummaryController extends BaseController {

	@RequestMapping(value = "/account/{accountId}/portfolioSummary", method = RequestMethod.GET)
	@ResponseBody
	public PortfolioSummary find(@PathVariable( "accountId" ) final Integer accountId ) {
		this.getSecurityUtil().checkAccount(accountId);
		return getTradingServiceFacade().findPortfolioSummary(accountId);
	
	}
	
	@RequestMapping(value = "/account/{accountId}/portfolioSummary", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void post() {
	}
	
}
