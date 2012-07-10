/**
 * 
 */
package com.springframework.vfabrictest.hqapi.service.domain;

import java.io.Serializable;

/**
 * @author Ilayaperumal Gopinathan
 *
 */
public class HQApiRequest implements Serializable {

	private String host;
	
	private String user;
	
	private String pwd;
	
	public void setHost(String host){
		this.host = host;
	}
	
	public String getHost(){
		return host;
	}
	
	public void setUser(String user){
		this.user = user;
	}
	
	public String getUser(){
		return user;
	}
	
	public void setPwd(String pwd){
		this.pwd = pwd;
	}
	
	public String getPwd(){
		return pwd;
	}
	
	 @Override
	 public String toString(){
		 return "Request = [ user= "+ user + "]";
	 }
}
