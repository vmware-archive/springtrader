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

	public void checkAccount(Integer accountId) {
		if (accountId == null
				|| accountId.compareTo(getAccountFromPrincipal()) != 0) {
			throw new AccessDeniedException(null);
		}
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
