package org.springsource.nanotrader.controller;

import javax.annotation.Resource;

import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.nanotrader.service.TradingService;
import org.springframework.nanotrader.service.domain.Quote;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springsource.nanotrader.exception.NoRecordsFoundException;

/**
 *  Provides JSON based REST api to Quote repository
 *  
 *  @author Brian Dussault 
 *  @author
 */
@Controller
@RequestMapping("/quote/*")
public class QuoteController {
	private static Logger log = LoggerFactory.getLogger(QuoteController.class);
	private static String QUOTE_MAPPING = "quote"; 
	@Resource
	private TradingService tradingService;

	@Resource
	private Mapper mapper;
	
	@RequestMapping(value = "/{symbol}", method = RequestMethod.GET)
	@ResponseBody
	public Quote findQuote(@PathVariable("symbol") final String symbol)  throws NoRecordsFoundException {
		if (log.isDebugEnabled()) { 
			log.debug("QuoteController.findQuote: quoteId=" + symbol);
		}
		org.springframework.nanotrader.domain.Quote quote = tradingService.findQuoteBySymbol(symbol);
		if (quote == null) { 
			throw new NoRecordsFoundException();
		} 
		Quote responseQuote = new Quote();
		mapper.map(quote, responseQuote, QUOTE_MAPPING);
		if (log.isDebugEnabled()) { 
			log.debug("QuoteController.findQuote: completed successfully.");
		}
		return responseQuote;
	}
}
