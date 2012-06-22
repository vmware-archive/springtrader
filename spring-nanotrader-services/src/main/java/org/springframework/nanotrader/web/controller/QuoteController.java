/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.nanotrader.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.nanotrader.service.domain.CollectionResult;
import org.springframework.nanotrader.service.domain.Quote;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Provides JSON based REST api to Quote repository
 * 
 * @author Brian Dussault
 * @author Kashyap Parikh
 */
@Controller
public class QuoteController extends BaseController {
	@RequestMapping(value = "/quote/{symbol}", method = RequestMethod.GET)
	@ResponseBody
	public Quote findQuote(@PathVariable("symbol") final String symbol) {
		Quote responseQuote = getTradingServiceFacade().findQuoteBySymbol(symbol);
		return responseQuote;
	}
	
	@RequestMapping(value = "/quotes", method = RequestMethod.GET)
	@ResponseBody
	public CollectionResult findQuotes() {
		return getTradingServiceFacade().findQuotes();
	}

	@RequestMapping(value = "/quote", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void post() {
	}
	
	@RequestMapping(value = "/quote/{symbol}", method = RequestMethod.PUT)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void put() {
		
	}
	
	@RequestMapping(value = "/quote/{symbol}", method = RequestMethod.DELETE)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void delete() {
		
	}
	
}
