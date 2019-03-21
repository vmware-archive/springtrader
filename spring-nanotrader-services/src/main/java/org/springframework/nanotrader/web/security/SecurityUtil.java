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
package org.springframework.nanotrader.web.security;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Provides utilities to work with SecurityContext
 * 
 * @author Brian Dussault
 */
public class SecurityUtil {

	public Integer getAccountFromPrincipal() {
		return getPrincipal().getAccountId();
	}
	
	public Integer getAccountProfileIdFromPrincipal() {
		return getPrincipal().getAccountProfileId();
	}

	public void checkAccountProfile(Integer accountProfileId) {
		if (accountProfileId == null
				|| accountProfileId.compareTo(getAccountProfileIdFromPrincipal()) != 0) {
			throw new AccessDeniedException(null);
		}
	}

	public void checkAccount(Integer accountId) {
		if (accountId == null
				|| accountId.compareTo(getAccountFromPrincipal()) != 0) {
			throw new AccessDeniedException(null);
		}
	}
	
	public void checkAuthToken(String token) {
		if (token == null
				|| !token.equals(getAuthToken())) {
			throw new AccessDeniedException(null);
		}
	}
	

	public String getAuthToken() { 
		return getPrincipal().getAuthToken();
	}
	
	public String getUsernameFromPrincipal() { 
		return getPrincipal().getUsername();
	}
	
	private CustomUser getPrincipal() {
		CustomUser principal = (CustomUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();

		return principal;
	}
}
