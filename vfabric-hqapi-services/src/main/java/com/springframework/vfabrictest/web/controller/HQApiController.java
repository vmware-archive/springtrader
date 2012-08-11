/**
 * 
 */
package com.springframework.vfabrictest.web.controller;

import java.util.ArrayList;
import java.util.List;

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
import com.springframework.vfabrictest.hqapi.service.domain.HQApiControlResponse;
import com.springframework.vfabrictest.hqapi.service.domain.HQApiRequest;
import com.springframework.vfabrictest.hqapi.service.domain.HQApiServersResponse;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
@Controller
public class HQApiController {
	
	
     @Autowired
     private HQApiService hqapiService;
     
     /**
 	 * Returns all the vfabric server instances list
 	 */
 	@RequestMapping(value = "/vfabric-servers/list", method = RequestMethod.POST)
 	@ResponseStatus(HttpStatus.OK)
 	@ResponseBody
 	public HQApiServersResponse getVFabricServers(@RequestBody HQApiRequest request) {
 		HQApi api = new HQApi(request.getHost(), 7080, false, request.getUser(), request.getPwd());
 		List<String> resourceTypes = new ArrayList<String>();
 		resourceTypes.add("SpringSource tc Runtime 6.0");
 		resourceTypes.add("SpringSource tc Runtime 7.0");
 		resourceTypes.add("RabbitMQ");
 		resourceTypes.add("PostgreSQL 9.0");
 		return hqapiService.getServersByResourceTypes(api, resourceTypes);
 	}
     
	/**
	 * Returns the tc server instances list
	 */
	@RequestMapping(value = "/tcs/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public HQApiServersResponse getTCServers(@RequestBody HQApiRequest request) {
		HQApi api = new HQApi(request.getHost(), 7080, false, request.getUser(), request.getPwd());
		List<String> resourceTypes = new ArrayList<String>();
		resourceTypes.add("SpringSource tc Runtime 6.0");
		resourceTypes.add("SpringSource tc Runtime 7.0");
		return hqapiService.getServersByResourceTypes(api, resourceTypes);
	}
	
	/**
	 * @param HQApiRequest containing HQ host, username/password.
	 * @return list of RabbitMQServers
	 */
	@RequestMapping(value = "/rabbitmq/list", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public HQApiServersResponse getRabbitMQs(@RequestBody HQApiRequest request) {
		HQApi api = new HQApi(request.getHost(), 7080, false, request.getUser(), request.getPwd());
		List<String> resourceTypes = new ArrayList<String>();
		resourceTypes.add("RabbitMQ");
		return hqapiService.getServersByResourceTypes(api, resourceTypes);
	}

	/**
	 * Control actions on the given tc Server
	 */
	@RequestMapping(value = "/controlaction", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.ACCEPTED)
	@ResponseBody
	public HQApiControlResponse controlTCServer(@RequestBody HQApiRequest request) {
		HQApi api = new HQApi(request.getHost(), 7080, false, request.getUser(), request.getPwd());
		return hqapiService.controlServer(api, request.getResourceId(), request.getAction());
	}

}
