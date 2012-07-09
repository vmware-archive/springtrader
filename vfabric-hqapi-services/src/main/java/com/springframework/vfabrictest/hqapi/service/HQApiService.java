/**
 * 
 */
package com.springframework.vfabrictest.hqapi.service;

import org.hyperic.hq.hqapi1.HQApi;

import com.springframework.vfabrictest.hqapi.service.domain.ControlAction;
import com.springframework.vfabrictest.hqapi.service.domain.HQApiResponse;


/**
 * @author Ilayaperumal Gopinathan
 *
 */

public interface HQApiService {
	
	public abstract HQApiResponse getUsers(HQApi api);
	
	public abstract HQApiResponse getTcs(HQApi api);
	
	public abstract String controlTcs(HQApi api, ControlAction action);

}
