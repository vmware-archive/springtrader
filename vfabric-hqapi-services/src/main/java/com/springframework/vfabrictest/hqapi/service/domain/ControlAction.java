/**
 * 
 */
package com.springframework.vfabrictest.hqapi.service.domain;

import java.io.Serializable;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
public class ControlAction implements Serializable {

	private String resourceId;

	private String action;

	private String host;

	private String user;

	private String pwd;

	public void setHost(String host) {
		this.host = host;
	}

	public String getHost() {
		return host;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getUser() {
		return user;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getPwd() {
		return pwd;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getAction() {
		return action;
	}

	public void setResourceId(String resourceId) {
		this.resourceId = resourceId;
	}

	public String getResourceId() {
		return resourceId;
	}
}
