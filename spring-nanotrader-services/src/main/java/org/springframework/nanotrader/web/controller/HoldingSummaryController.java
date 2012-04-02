package org.springframework.nanotrader.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.nanotrader.service.domain.HoldingSummary;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class HoldingSummaryController extends BaseController {

	@RequestMapping(value = "/account/{accountId}/holdingSummary", method = RequestMethod.GET)
	@ResponseBody
	public HoldingSummary find(
			@PathVariable("accountId") final Integer accountId) {
		this.getSecurityUtil().checkAccount(accountId);
		HoldingSummary holdingSummary = getTradingServiceFacade().findHoldingSummary(accountId);
		return holdingSummary;
	}

	@RequestMapping(value = "/account/{accountId}/holdingSummary", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void post() {
	}


}
