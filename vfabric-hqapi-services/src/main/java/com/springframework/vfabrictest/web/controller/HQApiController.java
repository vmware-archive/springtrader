/**
 * 
 */
package com.springframework.vfabrictest.web.controller;

import org.hyperic.hq.hqapi1.HQApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.springframework.vfabrictest.hqapi.service.HQApiService;
import com.springframework.vfabrictest.hqapi.service.domain.ControlAction;
import com.springframework.vfabrictest.hqapi.service.domain.HQApiRequest;
import com.springframework.vfabrictest.hqapi.service.domain.HQApiResponse;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
@Controller
public class HQApiController {
	
	
     @Autowired
     private HQApiService hqapiService;
     
	/**
	 * Returns the tc server instances list
	 */
	@RequestMapping(value = "/tcs/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public HQApiResponse getTCServerInstances(@RequestBody HQApiRequest request) {
		HQApi api = new HQApi(request.getHost(), 7080, false, request.getUser(), request.getPwd());
		return hqapiService.getTcs(api);
	}

	/**
	 * Control actions on the given tc Server
	 */
	@RequestMapping(value = "/tcs/control", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.ACCEPTED)
	@ResponseBody
	public String controlTCServer(@RequestBody ControlAction action) {
		HQApi api = new HQApi(action.getHost(), 7080, false, action.getUser(), action.getPwd());
		return hqapiService.controlTcs(api, action);
	}

}
