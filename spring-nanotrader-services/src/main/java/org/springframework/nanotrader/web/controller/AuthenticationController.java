package org.springframework.nanotrader.web.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.nanotrader.service.domain.AuthenticationRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;


/**
 * Provides JSON based REST api to nanotrader login and logout services
 * 
 * @author Brian Dussault
 * @author
 */

@Controller
public class AuthenticationController extends BaseController {


	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.CREATED )
	@ResponseBody
	public Map<String, Object> login(@RequestBody AuthenticationRequest authenticationRequest) {
		Map<String, Object> authenticationResponse = getTradingServiceFacade().login(authenticationRequest.getUsername(), authenticationRequest.getPassword());
		return authenticationResponse;// authToken and accountId;
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	@ResponseStatus( HttpStatus.OK )
	@ResponseBody
	public void logout() {
		getTradingServiceFacade().logout(this.getSecurityUtil().getAuthToken());
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void get() {
		
	}
}
