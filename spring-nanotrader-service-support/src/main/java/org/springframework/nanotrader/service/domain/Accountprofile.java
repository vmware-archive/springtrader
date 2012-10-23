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
import java.util.List;
import java.util.Map;

/**
 *  Account Profile
 *  @author Brian Dussault 
 */


@SuppressWarnings("serial")
public class Accountprofile implements Serializable{

	private Integer profileid;

    private String address;

    private String passwd;

    private String userid;
	
    private String email;

    private String creditcard;

    private String fullname;

	@SuppressWarnings("rawtypes")
	private List<Map> accounts;
	
	@SuppressWarnings("rawtypes")
	public List<Map> getAccounts() {
        return accounts;
    }

	@SuppressWarnings("rawtypes")
	public void setAccounts(List<Map> accounts) {
        this.accounts = accounts;
    }

	public String getAddress() {
        return address;
    }

	public void setAddress(String address) {
        this.address = address;
    }

	public String getPasswd() {
        return passwd;
    }

	public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

	public String getUserid() {
        return userid;
    }

	public void setUserid(String userid) {
        this.userid = userid;
    }

	public String getEmail() {
        return email;
    }

	public void setEmail(String email) {
        this.email = email;
    }

	public String getCreditcard() {
        return creditcard;
    }

	public void setCreditcard(String creditcard) {
        this.creditcard = creditcard;
    }

	public String getFullname() {
        return fullname;
    }

	public void setFullname(String fullname) {
        this.fullname = fullname;
    }
	
	public Integer getProfileid() {
        return this.profileid;
    }

	public void setProfileid(Integer id) {
        this.profileid = id;
    }
	
    @Override
	public String toString() {
		return "Accountprofile [profileid=" + profileid + ", address=" + address + ", passwd=" + passwd + ", userid="
				+ userid + ", email=" + email + ", creditcard=" + creditcard + ", fullname=" + fullname + "]";
	}
    
}
