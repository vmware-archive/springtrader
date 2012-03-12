package org.springframework.nanotrader.web.controller;

import javax.annotation.Resource;

import org.springframework.nanotrader.service.domain.Quote;
import org.springframework.nanotrader.service.support.TradingServiceFacade;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Provides JSON based REST api to Quote repository
 * 
 * @author Brian Dussault
 * @author
 */
@Controller
@RequestMapping("/quote/*")
public class QuoteController {
	@Resource
	private TradingServiceFacade tradingServiceFacade;

	@RequestMapping(value = "/{symbol}", method = RequestMethod.GET)
	@ResponseBody
	public Quote findQuote(@PathVariable("symbol") final String symbol) {
		Quote responseQuote = tradingServiceFacade.findQuoteBySymbol(symbol);
		return responseQuote;
	}
}
