/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.nanotrader.service.support;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.annotation.Resource;

import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.nanotrader.data.domain.Account;
import org.springframework.nanotrader.data.domain.Accountprofile;
import org.springframework.nanotrader.data.service.TradingService;
import org.springframework.nanotrader.service.cache.DataCreationProgressCache;
import org.springframework.nanotrader.service.domain.Order;
import org.springframework.nanotrader.service.domain.PerfTestData;
import org.springframework.nanotrader.service.domain.Quote;
import org.springframework.stereotype.Service;



/**
 * @author Ilayaperumal Gopinathan
 * 
 */
@Service
public class AdminServiceFacadeImpl implements AdminServiceFacade {

	private static Logger log = LoggerFactory.getLogger(AdminServiceFacadeImpl.class);

	@Resource
	private TradingService tradingService;

	@Resource
	private TradingServiceFacade tradingServiceFacade;

	@Resource
	private DataCreationProgressCache progressCache;

	@Resource
	private Mapper mapper;

	@Override
	public void recreateData(int count) {
		tradingService.deleteAll();
		ArrayList<Quote> quotes = new ArrayList<Quote>();
		for (org.springframework.nanotrader.data.domain.Quote q : tradingService.findRandomQuotes(5)) {
			Quote quote = new Quote();
			mapper.map(q, quote);
			quotes.add(quote);
		}
		log.debug("Creating " + count + " users");
		for (int i = 0; i <= count; i++) {
			String userid;
			if (i == 0) {
				log.debug("Creating admin user");
				userid = "admin";
			}
			else {
				userid = "user" + i;
			}
			BigDecimal balance = BigDecimal.valueOf(1000000.00);
			Account ac = new Account();
			ac.setBalance(balance);
			Date creationdate = new Date();
			ac.setCreationdate(creationdate);
			ac.setLastlogin(creationdate);
			ac.setLogincount(0);
			ac.setLogoutcount(0);
			ac.setOpenbalance(balance);
			Accountprofile ap = new Accountprofile();
			ap.setUserid(userid);
			// Password is same as that of the userid
			ap.setPasswd(userid);
			ap.setAddress(userid + " address");
			ap.setEmail(userid + "@nanotrader.com");
			ap.setFullname("first_" + userid + " " + "last " + userid);
			ap.setCreditcard("1111222233334444");
			Set<Account> accounts = new HashSet<Account>();
			accounts.add(ac);
			ap.setAccounts(accounts);
			tradingService.saveAccountProfile(ap);
			Order o = new Order();
			o.setAccountid((tradingService.findAccountByProfile(ap)).getAccountid());
			o.setCompletiondate(creationdate);
			o.setQuantity(new BigDecimal(1000));
			o.setOrdertype("buy");
			o.setQuote(quotes.get(0));
			tradingServiceFacade.saveOrder(o, false);
			o.setQuote(quotes.get(1));
			tradingServiceFacade.saveOrder(o, false);
			o.setQuote(quotes.get(2));
			tradingServiceFacade.saveOrder(o, false);
			o.setQuote(quotes.get(3));
			tradingServiceFacade.saveOrder(o, false);
			o.setQuote(quotes.get(4));
			tradingServiceFacade.saveOrder(o, false);
			progressCache.setProgresscount(i);
		}
		log.debug("User data creation completed");
	}

	@Override
	public Integer getProgressCount() {
		return progressCache.getProgresscount();
	}

	@Override
	public void deleteUserAccount(String userId) {
		tradingService.deleteAccountByUserid(userId);
	}

	@Override
	public void runPerfTest(PerfTestData perfTestData, String serverUrl) {
        Integer vmCount = Integer.parseInt(perfTestData.getVmcount());
        for (int i = 0; i < vmCount; i++){
        	new Thread(new PerformanceRunner(perfTestData.getCount(), perfTestData.getType(), perfTestData.getVmnames()[i], perfTestData.getUsernames()[i], perfTestData.getPasswords()[i], perfTestData.getInstallopts()[i], serverUrl)).start();
        }
	}
	
	
}
