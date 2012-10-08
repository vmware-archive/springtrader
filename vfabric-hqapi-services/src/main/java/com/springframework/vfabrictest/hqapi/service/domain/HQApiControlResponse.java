/**
 * 
 */
package com.springframework.vfabrictest.hqapi.service.domain;


/**
 * @author Ilayaperumal Gopinathan
 * 
 */
@SuppressWarnings("serial")
public class HQApiControlResponse {
	
	private String actionStatus;

	public String getStatus(){
		return actionStatus;
	}
	
	public void setStatus(String actionStatus){
		this.actionStatus = actionStatus;
	}

}
