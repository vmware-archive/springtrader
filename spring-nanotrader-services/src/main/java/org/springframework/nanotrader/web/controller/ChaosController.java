package org.springframework.nanotrader.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ChaosController {
	private static Logger log = LoggerFactory.getLogger(ChaosController.class);
	@RequestMapping(value = "/chaos/kill", method = RequestMethod.GET)
	@ResponseBody
	public void killProcess() {
		log.error("ChaosController.killProcess called.");
		System.exit(0);
		
	}
	
	@RequestMapping(value = "/chaos/oom", method = RequestMethod.GET)
	@ResponseBody
	public void outOfMemory() {
		log.error("ChaosController.outOfMemory() called.");
		List<String> memoryLeakList = new ArrayList<String>();
		while(true) { 
			StringBuffer bigString = new StringBuffer();
				for(int i =0; i < 128; i++) {    
					if(Character.isLowerCase((char)i) || Character.isUpperCase((char)i) ) {  
						bigString.append((char)i);   
					}    
				}
				memoryLeakList.add(bigString.toString());
			}
	}
}
