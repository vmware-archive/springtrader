package org.springframework.nanotrader.web.security;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.nanotrader.service.domain.Accountprofile;
import org.springframework.nanotrader.service.support.TradingServiceFacade;
import org.springframework.nanotrader.service.support.exception.AuthenticationException;
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
 */

@Service 
public class UserDetailsServiceImpl implements UserDetailsService {

	private static Logger log = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
	
	@Resource
	private TradingServiceFacade tradingServiceFacade;
	
	@Override

	public UserDetails loadUserByUsername(String token) throws UsernameNotFoundException  {
		if (token == null) {
			log.error("UserDetailsServiceImpl.loadUserByUsername(): User not found with null token");
			throw new UsernameNotFoundException("UserDetailsServiceImpl.loadUserByUsername(): User not found with null token");
		}
		Accountprofile accountProfile = null;
		try { 
			accountProfile = tradingServiceFacade.findAccountprofileByAuthtoken(token);
		} catch (AuthenticationException ae) { 
			throw new UsernameNotFoundException("UserDetailsServiceImpl.loadUserByUsername(): User not found with token:" + token);
		}
		
		@SuppressWarnings("rawtypes")
		Set<Map> accounts = accountProfile.getAccounts();
		Integer accountId = null;
		for(Map<?, ?> account: accounts ) { 
			accountId = (Integer)account.get("accountid");
		}
		
	
		User user = new CustomUser(accountProfile.getUserid(), accountProfile.getPasswd(), getAuthorities(), accountId, accountProfile.getProfileid(), token);
		if (log.isDebugEnabled()) { 
			log.debug("UserDetailsServiceImpl.loadUserByUsername(): user=" + user  + " username::token" + token);
		}
		
		return user;
	}

	private List<GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>(1);
        authList.add(new SimpleGrantedAuthority("ROLE_API_USER"));
        return authList;
    }
	

}
