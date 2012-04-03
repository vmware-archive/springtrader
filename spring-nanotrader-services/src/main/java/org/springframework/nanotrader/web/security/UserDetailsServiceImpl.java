package org.springframework.nanotrader.web.security;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.nanotrader.service.domain.Accountprofile;
import org.springframework.nanotrader.service.support.TradingServiceFacade;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 *  UserDetailsServiceImpl provides authentication lookup service which validates the http header token
 *  
 *  @author Brian Dussault 
 *  @author
 */

@Service 
public class UserDetailsServiceImpl implements UserDetailsService {


	@Resource
	private TradingServiceFacade tradingServiceFacade;
	
	@Override
	public UserDetails loadUserByUsername(String token) throws UsernameNotFoundException  {
		Accountprofile accountProfile = tradingServiceFacade.findAccountprofileByAuthtoken(token);
		if (accountProfile == null){ 
				throw new UsernameNotFoundException("UserDetailsServiceImpl.loadUserByUsername(): User not found with token:" + token);
		}
		Set<Map> accounts = accountProfile.getAccounts();
		Integer accountId = null;
		for(Map account: accounts ) { 
			accountId = (Integer)account.get("accountid");
		}
		User user = new CustomUser(accountProfile.getUserid(), accountProfile.getPasswd(), getAuthorities(), accountId, accountProfile.getProfileid(), token);
		return user;
	}

	private List<GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>(1);
        authList.add(new SimpleGrantedAuthority("ROLE_API_USER"));
        return authList;
    }
	

}
