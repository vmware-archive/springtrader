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
	
	public Integer getAccountProfileId() {
		return accountProfileId;
	}

	public void setAccountProfileId(Integer accountProfileId) {
		this.accountProfileId = accountProfileId;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	public CustomUser(String username, String password,
			Collection<? extends GrantedAuthority> authorities, Integer accountId, Integer accountProfileId) {
		super(username, password, authorities);
		this.accountId = accountId;
		this.setAccountProfileId(accountProfileId);
	}

	public Integer getAccountId() {
		return accountId;
	}


	
}
