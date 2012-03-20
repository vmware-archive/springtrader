package org.springframework.nanotrader.web.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;


/**
 *  Custom user object that includes accountId
 *  
 *  @author Brian Dussault 
 *  @author
 */

@SuppressWarnings("serial")
public class CustomUser extends User {
	private Integer accountId;
	
	public CustomUser(String username, String password,
			Collection<? extends GrantedAuthority> authorities, Integer accountId) {
		super(username, password, authorities);
		this.accountId = accountId;
	}

	public Integer getAccountId() {
		return accountId;
	}


	
}
