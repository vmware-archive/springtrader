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
	private Integer accountProfileId;
	private String authToken;
	
	public Integer getAccountProfileId() {
		return accountProfileId;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	public CustomUser(String username, String password,
			Collection<? extends GrantedAuthority> authorities, Integer accountId, Integer accountProfileId, String token) {
		super(username, password, authorities);
		this.accountId = accountId;
		this.accountProfileId = accountProfileId;
		this.authToken = token;
	}

	
	public String getAuthToken() {
		return authToken;
	}

	public Integer getAccountId() {
		return accountId;
	}


	
}
