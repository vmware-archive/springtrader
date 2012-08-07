/**
 * 
 */
package com.springframework.vfabrictest.hqapi.service.domain;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
@SuppressWarnings("serial")
public class HQApiServersResponse {
	
	private Map<Integer, HashMap<String, String>> servers = null;

	public Map<Integer, HashMap<String, String>> getServers(){
		return servers;
	}
	
	public void setResults(Map<Integer, HashMap<String, String>> servers){
		this.servers = servers;
	}

}
