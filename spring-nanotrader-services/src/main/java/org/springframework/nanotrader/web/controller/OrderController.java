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

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.nanotrader.service.domain.CollectionResult;
import org.springframework.nanotrader.service.domain.Order;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * Provides JSON based REST api to Order repository
 * 
 * @author Brian Dussault
 */
@Controller
public class OrderController extends BaseController {

	@RequestMapping(value = "/account/{accountId}/orders", method = RequestMethod.GET)
	public ResponseEntity<CollectionResult> findOrders(
			@PathVariable("accountId") final Integer accountId,
			@RequestParam(value = "status", required = false) final String status,
			@RequestParam(value = "page", required = false) Integer page,
			@RequestParam(value = "pageSize", required = false) Integer pageSize) {
		this.getSecurityUtil().checkAccount(accountId); // verify that the
														// account on the path
														// is the same as the
														// authenticated user
		return new ResponseEntity<CollectionResult>(getTradingServiceFacade()
				.findOrders(accountId, status, page, pageSize),
				getNoCacheHeaders(), HttpStatus.OK);
	}

	@RequestMapping(value = "/account/{accountId}/order/{id}", method = RequestMethod.GET)
	public ResponseEntity<Order> findOrder(
			@PathVariable("accountId") final Integer accountId,
			@PathVariable("id") final Integer orderId) {
		this.getSecurityUtil().checkAccount(accountId);
		Order responseOrder = getTradingServiceFacade().findOrder(orderId,
				accountId);

		return new ResponseEntity<Order>(responseOrder, getNoCacheHeaders(),
				HttpStatus.OK);
	}

	@RequestMapping(value = "/account/{accountId}/order", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<String> save(@RequestBody Order orderRequest,
			@PathVariable("accountId") final Integer accountId,
			UriComponentsBuilder builder) {
		this.getSecurityUtil().checkAccount(accountId);
		orderRequest.setAccountid(accountId);
		Integer orderId = getTradingServiceFacade().saveOrder(orderRequest,
				true);
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.setLocation(builder
				.path("/account/" + accountId + "/order/{id}")
				.buildAndExpand(orderId).toUri());
		return new ResponseEntity<String>(responseHeaders, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/account/{accountId}/order/asynch", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.ACCEPTED)
	public void saveAsynch(@RequestBody Order orderRequest,
			@PathVariable("accountId") final Integer accountId) {
		orderRequest.setAccountid(accountId);
		getTradingServiceFacade().saveOrder(orderRequest, false);
	}

	@RequestMapping(value = "/account/{accountId}/order/{id}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	public void update(@RequestBody Order orderRequest,
			@PathVariable("accountId") final Integer accountId,
			@PathVariable("id") final Integer orderId) {

	}

	@RequestMapping(value = "/account/{accountId}/order/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	public void delete() {

	}

}
