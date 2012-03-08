package org.springframework.nanotrader.web.controller;

import javax.annotation.Resource;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.nanotrader.service.domain.Accountprofile;
import org.springframework.nanotrader.service.support.TradingServiceFacade;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * Provides JSON based REST api to Accountprofile repository
 * 
 * @author Brian Dussault
 * @author
 */

@Controller
public class AccountProfileController {
	@Resource
	private TradingServiceFacade tradingServiceFacade;

	@RequestMapping(value = "/accountProfile/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Accountprofile find(@PathVariable("id") final Integer id) {
		Accountprofile accountProfile = tradingServiceFacade.findAccountProfile(id);
		return accountProfile;
	}

	@RequestMapping(value = "/accountProfile", method = RequestMethod.POST)
	public ResponseEntity<String> save(@RequestBody Accountprofile accountProfileRequest,  UriComponentsBuilder builder) {
		Integer accountProfileId = tradingServiceFacade.saveAccountProfile(accountProfileRequest);
		HttpHeaders responseHeaders = new HttpHeaders();   
		responseHeaders.setLocation(builder.path("/accountProfile/{id}").buildAndExpand(accountProfileId).toUri());
		return new ResponseEntity<String>(responseHeaders, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/accountProfile", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void update(@RequestBody Accountprofile accountProfileRequest) {
		tradingServiceFacade.updateAccountProfile(accountProfileRequest);
	}

}
