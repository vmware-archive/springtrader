package org.springframework.nanotrader.web.controller;

import javax.annotation.Resource;

import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.nanotrader.service.TradingService;
import org.springframework.nanotrader.service.domain.Accountprofile;
import org.springframework.nanotrader.web.exception.NoRecordsFoundException;
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
	private TradingService tradingService;

	@Resource
	private Mapper mapper;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Accountprofile find(@PathVariable("id") final Integer id)
			throws NoRecordsFoundException {
		if (log.isDebugEnabled()) {
			log.debug("AccountProfileController.find: id=" + id);
		}
		org.springframework.nanotrader.domain.Accountprofile accountProfile = null;
		Accountprofile accountProfileResponse = new Accountprofile();
		accountProfile = tradingService.findAccountProfile(id);
		if (accountProfile == null) {
			throw new NoRecordsFoundException();
		}

		mapper.map(accountProfile, accountProfileResponse, "accountProfile");
		if (log.isDebugEnabled()) {
			log.debug("AccountProfileController.find - after service call. Payload is: "
					+ accountProfileResponse);
		}

		return accountProfileResponse;
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void save(@RequestBody Accountprofile accountProfileRequest) {
		if (log.isDebugEnabled()) {
			log.debug("AccountProfileController.save:"
					+ accountProfileRequest.toString());
		}
		org.springframework.nanotrader.domain.Accountprofile accountProfile = new org.springframework.nanotrader.domain.Accountprofile();
		mapper.map(accountProfileRequest, accountProfile);
		tradingService.saveAccountProfile(accountProfile);
	}

	@RequestMapping(value = "/", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void update(@RequestBody Accountprofile accountProfileRequest) {
		if (log.isDebugEnabled()) {
			log.debug("AccountProfileController.update:"
					+ accountProfileRequest.toString());
		}
		org.springframework.nanotrader.domain.Accountprofile accountProfile = new org.springframework.nanotrader.domain.Accountprofile();
		mapper.map(accountProfileRequest, accountProfile);
		tradingService.updateAccountProfile(accountProfile);

	}

}
