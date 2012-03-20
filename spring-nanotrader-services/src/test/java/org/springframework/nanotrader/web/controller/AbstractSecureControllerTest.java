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
		UserDetails user = new CustomUser(ServiceTestConfiguration.USER_ID, ServiceTestConfiguration.PASSWORD, grantedAuthorities, ServiceTestConfiguration.ACCOUNT_ID);
		Authentication authentication = new TestingAuthenticationToken(user, ServiceTestConfiguration.PASSWORD, (List<GrantedAuthority>)grantedAuthorities );
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}
	
	@After
	public void logout() {
		SecurityContextHolder.clearContext();
	}

}
