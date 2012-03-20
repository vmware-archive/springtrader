package org.springframework.nanotrader.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.nanotrader.service.domain.Holding;
import org.springframework.nanotrader.service.support.TradingServiceFacade;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *  Provides JSON based REST api to Holdings repository
 *  
 *  @author Brian Dussault 
 *  @author
 */

@Controller
public class HoldingController extends BaseController {

	@Resource
	private TradingServiceFacade tradingServiceFacade;
	
	@RequestMapping(value = "/{accountId}/holding/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Holding find(@PathVariable( "id" ) final Integer id, @PathVariable( "accountId" ) final Integer accountId ) {
		Holding holdingResponse = new Holding();
		this.getSecurityUtil().checkAccount(accountId);
		holdingResponse = tradingServiceFacade.findHolding(id, this.getSecurityUtil().getAccountFromPrincipal());
		return holdingResponse;
	}
	
	@RequestMapping(value = "/{accountId}/holding", method = RequestMethod.GET)
	@ResponseBody
	public List<Holding> findByAccountId(@PathVariable( "accountId" ) final Integer accountId, 
										 @RequestParam(value="page", required=false) Integer page, 
										 @RequestParam(value="pageSize", required=false) Integer pageSize) {
		this.getSecurityUtil().checkAccount(accountId);
		List<Holding> holdingResponse = tradingServiceFacade.findHoldingsByAccountId(accountId, page, pageSize);
		return holdingResponse;
	}

	
}
