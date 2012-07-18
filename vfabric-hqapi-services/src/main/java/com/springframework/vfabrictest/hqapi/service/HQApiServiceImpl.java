/**
 * 
 */
package com.springframework.vfabrictest.hqapi.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hyperic.hq.hqapi1.HQApi;
import org.hyperic.hq.hqapi1.types.ControlActionResponse;
import org.hyperic.hq.hqapi1.types.Resource;
import org.hyperic.hq.hqapi1.types.ResourcePrototype;
import org.hyperic.hq.hqapi1.types.ResourcesResponse;
import org.hyperic.hq.hqapi1.types.ResponseStatus;
import org.hyperic.hq.hqapi1.types.User;
import org.springframework.stereotype.Service;

import com.springframework.vfabrictest.hqapi.service.domain.HQApiResponse;
import com.springframework.vfabrictest.hqapi.service.domain.HQApiServersResponse;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
@Service
public class HQApiServiceImpl implements HQApiService {

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.springframework.vfabrictest.hqapi.service.HQApiService#getUsers()
	 */
	@Override
	public HQApiResponse getUsers(HQApi api) {
		HQApiResponse resp = new HQApiResponse();
		List<User> users = new ArrayList<User>();
		try {
			org.hyperic.hq.hqapi1.types.UsersResponse status = api.getUserApi().getUsers();
			if (status.getStatus().equals(ResponseStatus.SUCCESS)) {
				users = status.getUser();
			}
		}
		catch (Exception e) {
			System.out.print(e.getMessage());
		}
		resp.setResults(users);
		return resp;
	}

	@Override
	public HQApiServersResponse getServersByResourceTypes(HQApi api, List<String> resourceTypes) {
		HQApiServersResponse resp = new HQApiServersResponse();
		Map<Integer, HashMap<String, String>> servers = new HashMap<Integer, HashMap<String, String>>();
		for (String resourceType : resourceTypes) {
			try {
				ResourcePrototype rpt = api.getResourceApi().getResourcePrototype(resourceType).getResourcePrototype();
				ResourcesResponse status = api.getResourceApi().getResources(rpt, false, false);
				
				if (status.getStatus().equals(ResponseStatus.SUCCESS)) {
					for (Resource res: status.getResource()){
						List<String> controlActions = new ArrayList<String>();
						ControlActionResponse controlStatus = api.getControlApi().getActions(res);
						if (controlStatus.getStatus().equals(ResponseStatus.SUCCESS)) {
							controlActions = controlStatus.getAction();
						}
						HashMap<String, String> server = new HashMap<String, String>();
						server.put("id", String.valueOf(res.getId()));
						server.put("name", res.getName());
						server.put("resourceType", resourceType);
						server.put("actionSize", String.valueOf(controlActions.size()));
						int i = 0;
						for (String action: controlActions){
							server.put("action"+i, action);
							i++;
						}
						servers.put(res.getId(), server);
					}
					
				}
			}
			catch (Exception e) {
				System.out.print(e.getMessage());
			}
		}
		resp.setResults(servers);
		return resp;
	}

	@Override
	public String controlServer(HQApi api, String resourceId, String action) {
		String status = "";
		try {
			Resource res = api.getResourceApi().getResource(Integer.parseInt(resourceId), false, false).getResource();
			status = api.getControlApi().executeAction(res, action, new String[0]).getStatus().name();
		}
		catch (Exception e) {
			System.out.print(e.getMessage());
		}
		return status;
	}

}
