/**
 * 
 */
package com.springframework.vfabrictest.web.controller;

import org.hyperic.hq.hqapi1.HQApi;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.springframework.vfabrictest.hqapi.service.HQApiService;
import com.springframework.vfabrictest.hqapi.service.domain.ControlAction;
import com.springframework.vfabrictest.hqapi.service.domain.HQApiResponse;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
@Controller
public class HQApiController {

	/**
	 * Returns the tc server instances list
	 */
	@RequestMapping(value = "/tcs/list", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public HQApiResponse getTCServerInstances() {
		//TODO: Set Hyperic host, user/pwd through HQApiRequest
		HQApi api = new HQApi("xxxxx", 7080, false, "xxxx", "xxxx");
		ApplicationContext context = new AnnotationConfigApplicationContext("com.springframework.vfabrictest");
		HQApiService hqApiService = (HQApiService) context.getBean("HQApiServiceImpl");
		return hqApiService.getTcs(api);
	}

	/**
	 * Control actions on the given tc Server
	 */
	@RequestMapping(value = "/tcs/control", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.ACCEPTED)
	@ResponseBody
	public String controlTCServer(@RequestBody ControlAction action) {
		//TODO: Set Hyperic host, user/pwd through HQApiRequest
		HQApi api = new HQApi("xxxxx", 7080, false, "xxxx", "xxxx");
		ApplicationContext context = new AnnotationConfigApplicationContext("com.springframework.vfabrictest");
		HQApiService hqApiService = (HQApiService) context.getBean("HQApiServiceImpl");
		return hqApiService.controlTcs(api, action);
	}

}
