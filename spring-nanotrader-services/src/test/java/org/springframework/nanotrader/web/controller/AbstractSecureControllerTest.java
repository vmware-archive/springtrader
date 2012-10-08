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

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.springframework.nanotrader.web.configuration.ServiceTestConfiguration;
import org.springframework.nanotrader.web.security.CustomUser;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

/**
 *  AbstractSecureControllerTest provides security setup for unit tests as well
 *  as configures Spring-mvc-test mock MVC environment.
 *  
 *  @author Brian Dussault 
 *  @author
 */

public class AbstractSecureControllerTest extends AbstractBaseControllerTest {
	private static String API_ROLE = "API_USER";

	@Before
	public  void login() { 
		Collection<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
		grantedAuthorities.add(new SimpleGrantedAuthority(API_ROLE));		
		UserDetails user = new CustomUser(ServiceTestConfiguration.USER_ID, ServiceTestConfiguration.PASSWORD, grantedAuthorities, ServiceTestConfiguration.ACCOUNT_ID, ServiceTestConfiguration.PROFILE_ID, ServiceTestConfiguration.AUTH_TOKEN);
		Authentication authentication = new TestingAuthenticationToken(user, ServiceTestConfiguration.PASSWORD, (List<GrantedAuthority>)grantedAuthorities );
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}
	
	@After
	public void logout() {
		SecurityContextHolder.clearContext();
	}

}
