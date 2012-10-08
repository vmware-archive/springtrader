/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.nanotrader.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.nanotrader.chaos.util.MonkeyUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Provides chaos monkey REST based interface
 * 
 * @author Brian Dussault
 */

@Controller
public class ChaosController extends BaseController {
	private static Logger log = LoggerFactory.getLogger(ChaosController.class);
	public static List<String> memoryLeakList = new ArrayList<String>();

	@RequestMapping(value = "/chaos/kill", method = RequestMethod.GET)
	@ResponseBody
	public void killProcess() {
		log.error("ChaosController.killProcess called.");
		MonkeyUtils.killProcess();
	}
	
	@RequestMapping(value = "/chaos/oom", method = RequestMethod.GET)
	@ResponseBody
	public void outOfMemory() {
		log.error("ChaosController.outOfMemory() called.");
		MonkeyUtils.logChaos();
		
		while(true) { 
			StringBuffer bigString = new StringBuffer();
				for(int i =0; i < 128; i++) {    
					if(Character.isLowerCase((char)i) || Character.isUpperCase((char)i) ) {  
						bigString.append((char)i);   
					}
				}
				ChaosController.memoryLeakList.add(bigString.toString());
			}
	}
	
	@RequestMapping(value = "/chaos/killsql", method = RequestMethod.GET)
	@ResponseBody
	public void killSql() {
		log.error("ChaosController.killSql called. Check your database server logs...");
		try { 
			getTradingServiceFacade().killServer();
		} catch (Exception expectedException) { 
			log.error("ChaosController.killSql " + expectedException.getMessage());
		}
	}
	
}
