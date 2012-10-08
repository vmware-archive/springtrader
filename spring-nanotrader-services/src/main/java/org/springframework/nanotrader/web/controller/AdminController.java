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

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.nanotrader.service.domain.PerfTestData;
import org.springframework.nanotrader.service.domain.ProgressData;
import org.springframework.nanotrader.service.domain.RecreateData;
import org.springframework.nanotrader.service.domain.UserId;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Provides JSON based REST API to user data creation
 * @author Ilayaperumal Gopinathan
 * 
 */
@Controller
public class AdminController extends BaseController {

	/**
	 * Creates users & buy orders for the (usercount) number of users
	 * @param recreateDataRequest
	 */
	@RequestMapping(value = "/admin/userdata", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void recreateData(@RequestBody
	RecreateData recreateDataRequest) {
		this.getAdminServiceFacade().recreateData(Integer.parseInt(recreateDataRequest.getUsercount()));
	}

	/**
	 * Get the number of users created at the time of request
	 * @return ProgressData
	 */
	@RequestMapping(value = "/admin/userdata", method = RequestMethod.GET)
	@ResponseBody
	public ProgressData getProgress() {
		ProgressData progress = new ProgressData();
		progress.setUsercount(this.getAdminServiceFacade().getProgressCount());
		return progress;
	}

	/**
	 * Delete the account associated by the given userid
	 */
	@RequestMapping(value = "/admin/deleteaccount", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void deleteAccount(@RequestBody
	UserId userNameRequest) {
		this.getAdminServiceFacade().deleteUserAccount(userNameRequest.getUserid());
	}

	/**
	 * Run performance test
	 */
	@RequestMapping(value = "/admin/perftest", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public void runPerfTest(@RequestBody
	PerfTestData perfRequest, HttpServletRequest servletRequest) {
		String requestUrl = servletRequest.getRequestURL().toString();
		String serverPort = String.valueOf(servletRequest.getServerPort());
		String serverUrl = requestUrl.substring(0, requestUrl.lastIndexOf(":") + 1) + serverPort;
		String ipAddress = "localhost";
		if (serverUrl.contains("localhost")) {
			try {
				Enumeration<NetworkInterface> nif = NetworkInterface.getNetworkInterfaces();
				while (nif.hasMoreElements()) {
					Enumeration<InetAddress> inetaddr = nif.nextElement().getInetAddresses();
					while (inetaddr.hasMoreElements()) {
						InetAddress addr = inetaddr.nextElement();
						if (addr instanceof Inet4Address) {
							String ip = addr.getHostAddress();
							if (!ip.equals("127.0.0.1") && !ip.startsWith("192")) {
								ipAddress = ip;
							}
						}
					}
				}
				// String ipAddress = addr.getHostAddress();
				serverUrl = "http://" + ipAddress + ":" + serverPort;
			}
			catch (SocketException e) {
				throw new RuntimeException(e.getMessage());
			}
		}
		this.getAdminServiceFacade().runPerfTest(perfRequest, serverUrl);
	}
}
