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
package org.springframework.nanotrader.service.domain;

import java.io.Serializable;

/**
 * Performance test request body
 * @author Ilayaperumal Gopinathan
 */

@SuppressWarnings("serial")
public class PerfTestData implements Serializable {

	private String count;
	
	private String vmcount;
	
	private String type;
	
	private String[] vmnames;
	
	private String[] usernames;
	
	private String[] passwords;
	
	private String[] installopts;

	public String getCount() {
		return this.count;
	}
	
	public String getVmcount() {
		return this.vmcount;
	}
	
	public String getType() {
		return this.type;
	}
	
	public String[] getVmnames() {
		return this.vmnames;
	}
	
	public String[] getUsernames() {
		return this.usernames;
	}
	
	public String[] getPasswords() {
		return this.passwords;
	}
	
	public String[] getInstallopts() {
		return this.installopts;
	}
	

	public void setCount(String count) {
		this.count = count;
	}
	
	public void setVmcount(String vmcount) {
		this.vmcount = vmcount;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public void setVmnames(String[] vmnames) {
		this.vmnames = vmnames;
	}
	
	public void setUsernames(String[] usernames) {
		this.usernames = usernames;
	}
	
	public void setPasswords(String[] passwords) {
		this.passwords = passwords;
	}
	
	public void setInstallopts(String[] installopts) {
		this.installopts = installopts;
	}
	
	
}
