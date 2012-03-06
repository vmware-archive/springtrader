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
package org.springframework.nanotrader.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.nanotrader.domain.Account;
import org.springframework.nanotrader.domain.Accountprofile;
import org.springframework.nanotrader.domain.Holding;
import org.springframework.nanotrader.domain.Order;
import org.springframework.nanotrader.domain.test.AccountDataOnDemand;
import org.springframework.nanotrader.domain.test.AccountprofileDataOnDemand;
import org.springframework.nanotrader.domain.test.HoldingDataOnDemand;
import org.springframework.nanotrader.domain.test.OrderDataOnDemand;
import org.springframework.nanotrader.repository.AccountRepository;
import org.springframework.nanotrader.repository.HoldingRepository;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Gary Russell
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:/META-INF/spring/applicationContext*.xml")
@Transactional
public class TradingServiceTests {

	@Autowired
	private AccountDataOnDemand accountDataOnDemand;

	@Autowired
	private AccountprofileDataOnDemand accountprofileDataOnDemand;

	@Autowired
	private HoldingDataOnDemand holdingDataOnDemand;

	@Autowired
	private OrderDataOnDemand orderDataOnDemand;

	@Autowired
	private TradingService tradingService;
	
	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	HoldingRepository holdingRepository;

	@PersistenceContext
	EntityManager entityManager;

	@Test
	public void testfindAccountProfile() {
		Account account = accountDataOnDemand.getRandomAccount();
		entityManager.clear(); // force reload
		
		account = accountRepository.findOne(account.getAccountid());
		Accountprofile profile = tradingService.findAccountProfile(account.getProfileProfileid().getProfileid());
		assertEquals(account.getProfileProfileid().toString(), profile.toString());
		assertTrue(profile.getAccounts().contains(account));
	}

	@Test
	public void testsaveNewAccountProfile() {
		Accountprofile profile = accountprofileDataOnDemand.getNewTransientAccountprofile(100);
		Account account = accountDataOnDemand.getNewTransientAccount(100);
		profile.setAccounts(Collections.singleton(account));
		tradingService.saveAccountProfile(profile);
		entityManager.flush();
		entityManager.clear(); // force reload

		Accountprofile newProfile = tradingService.findAccountProfile(profile.getProfileid());
		account = newProfile.getAccounts().iterator().next();
		assertEquals(account.getProfileProfileid().toString(), newProfile.toString());
	}

	@Test
	public void testUpdateAccountProfile() {
		Account account = accountDataOnDemand.getRandomAccount();
		Accountprofile profile = account.getProfileProfileid();
		profile.setAddress("changed");
		tradingService.updateAccountProfile(profile);
		entityManager.flush();
		entityManager.clear(); // force reload

		Accountprofile newProfile = tradingService.findAccountProfile(profile.getProfileid());
		assertEquals(profile.toString(), newProfile.toString());
	}
	
	@Test
	public void testFindHoldingsByAccount() {
		Holding holding100 = holdingDataOnDemand.getNewTransientHolding(100); 
		Holding holding101 = holdingDataOnDemand.getNewTransientHolding(101);
		holding101.setAccountAccountid(holding100.getAccountAccountid());
		holdingRepository.save(holding100);
		holdingRepository.save(holding101);
		entityManager.flush();
		entityManager.clear(); // force reload

		List<Holding> holdings = tradingService.findHoldingsByAccountId(holding100.getAccountAccountid());
		assertEquals(2, holdings.size());
		Map<Integer, Holding> map = new HashMap<Integer, Holding>();
		map.put(holdings.get(0).getHoldingid(), holdings.get(0));
		map.put(holdings.get(1).getHoldingid(), holdings.get(1));
		assertNotNull(map.remove(holding100.getHoldingid()));
		assertNotNull(map.remove(holding101.getHoldingid()));
	}

	@Test
	public void testSaveAndFindAndUpdateHolding() {
		Holding holding = holdingDataOnDemand.getNewTransientHolding(100);
		holding.setPurchasedate(new java.sql.Date(System.currentTimeMillis()));
		tradingService.saveHolding(holding);
		entityManager.flush();
		entityManager.clear(); // force reload

		Holding newHolding = tradingService.findHolding(holding.getHoldingid());
		assertEquals(holding.toString(), newHolding.toString());

		newHolding.setPurchaseprice(BigDecimal.valueOf(1234.56));
		tradingService.updateHolding(newHolding);
		entityManager.flush();
		entityManager.clear(); // force reload

		Holding updatedHolding = tradingService.findHolding(holding.getHoldingid());
		assertEquals(newHolding.toString(), updatedHolding.toString());
		
	}

	@Test
	public void testSaveAndFindOrder() {
		Order order = orderDataOnDemand.getNewTransientOrder(100);
		order.setOrdertype(TradingService.ORDER_TYPE_BUY);
		order.setOpendate(new java.sql.Date(System.currentTimeMillis()));
		order.setCompletiondate(new java.sql.Date(System.currentTimeMillis()));
		tradingService.saveOrder(order);
		entityManager.flush();
		entityManager.clear(); // force reload

		Order foundOrder = tradingService.findOrder(order.getOrderid());
		assertNotNull(foundOrder);
		
		BigDecimal oldPrice = foundOrder.getPrice();
		foundOrder.setPrice(BigDecimal.valueOf(123.45));
		tradingService.updateOrder(foundOrder);
		entityManager.flush();
		entityManager.clear(); // force reload

		Order updatedOrder = tradingService.findOrder(order.getOrderid());
		assertTrue(!order.toString().equals(updatedOrder.toString()));
		
		order.setPrice(oldPrice);
		tradingService.updateOrder(foundOrder);
		entityManager.flush();
		entityManager.clear(); // force reload

		updatedOrder = tradingService.findOrder(order.getOrderid());
		assertEquals(foundOrder.toString(), updatedOrder.toString());
	}
}
