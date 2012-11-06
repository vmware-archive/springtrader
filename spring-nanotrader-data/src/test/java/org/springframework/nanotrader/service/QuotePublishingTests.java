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

import static org.junit.Assert.fail;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.nanotrader.data.domain.Quote;
import org.springframework.nanotrader.data.repository.QuoteRepository;
import org.springframework.nanotrader.data.service.TradingService;
import org.springframework.nanotrader.data.service.TradingServiceImpl;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.ReflectionUtils.MethodCallback;

/**
 * @author Gary Russell
 *
 */
@ContextConfiguration
@RunWith(SpringJUnit4ClassRunner.class)

public class QuotePublishingTests {

	@Autowired
	private TradingService tradingService;

	@Autowired
	QuoteRepository quoteRepository;

	@Before
	public void setupMocks() {
		Quote quote = new Quote();
		quote.setSymbol("VMW");
		quote.setPrice(BigDecimal.valueOf(120.0));
		quote.setVolume(BigDecimal.valueOf(1000));
		quote.setOpen1(BigDecimal.valueOf(115.0));
		quote.setHigh(BigDecimal.valueOf(130.0));
		quote.setLow(BigDecimal.valueOf(1.0));
		Mockito.when(quoteRepository.findBySymbol("VMW")).thenReturn(quote);
	}

	@Test
	public void test() {
		ReflectionUtils.doWithMethods(TradingServiceImpl.class, new MethodCallback() {
			@Override
			public void doWith(Method method) throws IllegalArgumentException,
					IllegalAccessException {
				if ("updateQuoteMarketData".equals(method.getName())) {
					method.setAccessible(true);
					try {
						method.invoke(tradingService, "VMW", BigDecimal.valueOf(1.0), BigDecimal.valueOf(100.0));
					} catch (InvocationTargetException e) {
						e.printStackTrace();
						fail("Failed to invoke updateQuoteMarketData:" + e.getMessage());
					}
				}
			}
		});
	}

}
