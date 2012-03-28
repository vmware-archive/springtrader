package org.springframework.nanotrader.service.domain;

/**
 *  AuthenticationRequest
 *  @author Brian Dussault 
 *  @author
 */
public class AuthenticationRequest {
	private String username;
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
