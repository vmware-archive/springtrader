/**
 * 
 */
package com.springframework.vfabrictest.hqapi.service;

import java.util.ArrayList;
import java.util.List;

import org.hyperic.hq.hqapi1.HQApi;
import org.hyperic.hq.hqapi1.types.Resource;
import org.hyperic.hq.hqapi1.types.ResourcePrototype;
import org.hyperic.hq.hqapi1.types.ResourcesResponse;
import org.hyperic.hq.hqapi1.types.ResponseStatus;
import org.hyperic.hq.hqapi1.types.User;
import org.springframework.stereotype.Service;

import com.springframework.vfabrictest.hqapi.service.domain.ControlAction;
import com.springframework.vfabrictest.hqapi.service.domain.HQApiResponse;

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
	public HQApiResponse getTcs(HQApi api) {
		HQApiResponse resp = new HQApiResponse();
		List<Resource> tcs = new ArrayList<Resource>();
		try {
			ResourcePrototype rpt = api.getResourceApi().getResourcePrototype("SpringSource tc Runtime 6.0").getResourcePrototype();
			ResourcesResponse status = api.getResourceApi().getResources(rpt, false, false);
			if (status.getStatus().equals(ResponseStatus.SUCCESS)) {
				tcs.addAll(status.getResource());
			}
			rpt = api.getResourceApi().getResourcePrototype("SpringSource tc Runtime 7.0").getResourcePrototype();
			status = api.getResourceApi().getResources(rpt, false, false);
			if (status.getStatus().equals(ResponseStatus.SUCCESS)) {
				tcs.addAll(status.getResource());
			}
		}
		catch (Exception e) {
			System.out.print(e.getMessage());
		}
		resp.setResults(tcs);
		return resp;
	}
	
	@Override
	public String controlTcs(HQApi api, ControlAction action) {
		String status = "";
		try {
			Resource res = api.getResourceApi().getResource(action.getResourceId(), false, false).getResource();
			status = api.getControlApi().executeAction(res, action.getAction(), new String[0]).getStatus().name();
		}
		catch (Exception e) {
			System.out.print(e.getMessage());
		}
		return status;
	}

}
