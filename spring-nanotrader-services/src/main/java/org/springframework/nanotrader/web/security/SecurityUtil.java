package org.springframework.nanotrader.web.security;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Provides utilities to work with SecurityContext
 * 
 * @author Brian Dussault
 * @author
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
