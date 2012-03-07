package org.springframework.nanotrader.web.controller;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.nanotrader.service.domain.Accountprofile;
import org.springframework.nanotrader.service.support.TradingServiceFacade;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Provides JSON based REST api to Accountprofile repository
 * 
 * @author Brian Dussault
 * @author
 */

@Controller
@RequestMapping("/accountProfile/*")
public class AccountProfileController {
	private static Logger log = LoggerFactory
			.getLogger(AccountProfileController.class);

	@Resource
	private TradingServiceFacade tradingServiceFacade;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Accountprofile find(@PathVariable("id") final Integer id) {
		Accountprofile accountProfile = tradingServiceFacade.findAccountProfile(id);
		return accountProfile;
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void save(@RequestBody Accountprofile accountProfileRequest) {
		tradingServiceFacade.saveAccountProfile(accountProfileRequest);
	}

	@RequestMapping(value = "/", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void update(@RequestBody Accountprofile accountProfileRequest) {
		tradingServiceFacade.updateAccountProfile(accountProfileRequest);

	}

}
