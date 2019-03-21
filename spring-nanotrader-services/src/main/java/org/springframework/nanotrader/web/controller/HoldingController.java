/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.nanotrader.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.nanotrader.service.domain.CollectionResult;
import org.springframework.nanotrader.service.domain.Holding;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Provides JSON based REST api to Holdings repository
 * 
 * @author Brian Dussault
 */

@Controller
public class HoldingController extends BaseController {

	@RequestMapping(value = "/account/{accountId}/holding/{id}", method = RequestMethod.GET)
	public ResponseEntity<Holding> find(@PathVariable("id") final Integer id,
			@PathVariable("accountId") final Integer accountId) {
		Holding holdingResponse = new Holding();
		this.getSecurityUtil().checkAccount(accountId);
		holdingResponse = getTradingServiceFacade().findHolding(id,
				this.getSecurityUtil().getAccountFromPrincipal());
		return new ResponseEntity<Holding>(holdingResponse,
				getNoCacheHeaders(), HttpStatus.OK);
	}

	@RequestMapping(value = "/account/{accountId}/holdings", method = RequestMethod.GET)
	public ResponseEntity<CollectionResult> findByAccountId(
			@PathVariable("accountId") final Integer accountId,
			@RequestParam(value = "page", required = false) Integer page,
			@RequestParam(value = "pageSize", required = false) Integer pageSize) {
		this.getSecurityUtil().checkAccount(accountId);
		return new ResponseEntity<CollectionResult>(getTradingServiceFacade()
				.findHoldingsByAccountId(accountId, page, pageSize),
				getNoCacheHeaders(), HttpStatus.OK);

	}

	@RequestMapping(value = "/account/{accountId}/holding", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	public void post() {
	}

	@RequestMapping(value = "/account/{accountId}/holding/{id}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	public void put() {

	}

	@RequestMapping(value = "/account/{accountId}/holding/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	public void delete() {

	}

}
