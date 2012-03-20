package org.springframework.nanotrader.web.controller;

import org.springframework.nanotrader.service.domain.Account;
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
public class AccountController extends BaseController {
	@RequestMapping(value = "/account/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Account find(@PathVariable( "id" ) final Integer id) {
		this.getSecurityUtil().checkAccount(id);
		Account accountResponse = this.getTradingServiceFacade().findAccount(id);
		return accountResponse;
	}
	
	
	
}
