/**
 * 
 */
package com.springframework.vfabrictest.hqapi.service;

import java.util.List;

import org.hyperic.hq.hqapi1.HQApi;

import com.springframework.vfabrictest.hqapi.service.domain.HQApiControlResponse;
import com.springframework.vfabrictest.hqapi.service.domain.HQApiResponse;
import com.springframework.vfabrictest.hqapi.service.domain.HQApiServersResponse;


/**
 * @author Ilayaperumal Gopinathan
 *
 */

public interface HQApiService {
	
	public abstract HQApiResponse getUsers(HQApi api);
	
	public abstract HQApiServersResponse getServersByResourceTypes(HQApi api, List<String> resourceTypes);
	
	public abstract HQApiControlResponse controlServer(HQApi api, String resourceId, String action);

}
