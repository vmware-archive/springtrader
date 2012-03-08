package org.springframework.nanotrader.web.controller;

import javax.annotation.Resource;

import org.springframework.nanotrader.service.domain.Account;
import org.springframework.nanotrader.service.support.TradingServiceFacade;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Provides JSON based REST api to Account repository
 * 
 * @author Brian Dussault
 * @author
 */

@Controller
public class AccountController {
	@Resource
	private TradingServiceFacade tradingServiceFacade;
	
	@RequestMapping(value = "/account/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Account find(@PathVariable( "id" ) final Integer id ) {
		Account accountResponse = null;
		accountResponse = tradingServiceFacade.findAccount(id);
		return accountResponse;
	}
	
}
