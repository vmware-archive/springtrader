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
import java.math.BigDecimal;
import java.util.Date;
/**
 *  Account
 *  @author Brian Dussault 
 */

@SuppressWarnings("serial")
public class Account implements Serializable {

    private Date creationdate;
    private BigDecimal openbalance;
    private Integer logoutcount;
    private BigDecimal balance;
    private Date lastlogin;
    private Integer logincount;

	public Date getCreationdate() {
        return creationdate;
    }

	public void setCreationdate(Date creationdate) {
        this.creationdate = creationdate;
    }

	public BigDecimal getOpenbalance() {
        return openbalance;
    }

	public void setOpenbalance(BigDecimal openbalance) {
        this.openbalance = openbalance;
    }

	public Integer getLogoutcount() {
        return logoutcount;
    }

	public void setLogoutcount(Integer logoutcount) {
        this.logoutcount = logoutcount;
    }

	public BigDecimal getBalance() {
        return balance;
    }

	public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

	public Date getLastlogin() {
        return lastlogin;
    }

	public void setLastlogin(Date lastlogin) {
        this.lastlogin = lastlogin;
    }

	public Integer getLogincount() {
        return logincount;
    }

	public void setLogincount(Integer logincount) {
        this.logincount = logincount;
    }


    private Integer accountid;

	public Integer getAccountid() {
        return this.accountid;
    }

	public void setAccountid(Integer id) {
        this.accountid = id;
    }


}
