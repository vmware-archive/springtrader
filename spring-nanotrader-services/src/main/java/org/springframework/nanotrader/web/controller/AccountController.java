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
import org.springframework.nanotrader.service.domain.Account;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Provides JSON based REST api to Account repository
 * 
 * @author Brian Dussault
 */

@Controller
public class AccountController extends BaseController {
	
	@RequestMapping(value = "/account/{id}", method = RequestMethod.GET)
	public ResponseEntity<Account> find(@PathVariable( "id" ) final Integer id) {
		this.getSecurityUtil().checkAccount(id);
		Account accountResponse = this.getTradingServiceFacade().findAccount(id);
		return new ResponseEntity<Account>(accountResponse, getNoCacheHeaders(),
				HttpStatus.OK);
		
	}
	
	
	@RequestMapping(value = "/account", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void post() {
	}
	
	@RequestMapping(value = "/account/{id}", method = RequestMethod.PUT)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void put() {
		
	}
	
	@RequestMapping(value = "/account/{id}", method = RequestMethod.DELETE)
	@ResponseStatus( HttpStatus.METHOD_NOT_ALLOWED )
	public void delete() {
		
	}
	
	
}
