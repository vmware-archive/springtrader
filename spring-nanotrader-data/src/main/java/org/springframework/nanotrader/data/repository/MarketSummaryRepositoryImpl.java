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
package org.springframework.nanotrader.data.repository;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.nanotrader.data.domain.MarketSummary;
import org.springframework.nanotrader.data.util.FinancialUtils;
import org.springframework.stereotype.Repository;

/**
 * @author Brian Dussault
 *
 */
@Repository
public class MarketSummaryRepositoryImpl implements MarketSummaryRepository {
	@PersistenceContext
	private EntityManager em;

	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	public MarketSummary findMarketSummary() {
		MarketSummary marketSummary = new MarketSummary();
		Query query = em
				.createQuery("SELECT SUM(q.price)/count(q) as tradeStockIndexAverage, "
						+ "SUM(q.open1)/count(q) as tradeStockIndexOpenAverage, "
						+ "SUM(q.volume) as tradeStockIndexVolume, "
						+ "SUM(q) as cnt , "
						+ "SUM(q.change1)"
						+ "FROM Quote q");
		marketSummary.setTradeStockIndexAverage(BigDecimal.ZERO.setScale(FinancialUtils.SCALE, FinancialUtils.ROUND));
		marketSummary.setTradeStockIndexOpenAverage(BigDecimal.ZERO.setScale(FinancialUtils.SCALE, FinancialUtils.ROUND));
		marketSummary.setTradeStockIndexVolume(BigDecimal.ZERO.setScale(FinancialUtils.SCALE, FinancialUtils.ROUND));
		marketSummary.setChange(BigDecimal.ZERO.setScale(FinancialUtils.SCALE, FinancialUtils.ROUND));
		@SuppressWarnings("unchecked")
		List<Object[]> result = query.getResultList();
		for (Object[] o : result) {
			if (o[0] != null && o[1] != null && o[2] != null && o[3] != null && o[4] != null) {
				marketSummary.setTradeStockIndexAverage(((BigDecimal) o[0])
						.setScale(FinancialUtils.SCALE, FinancialUtils.ROUND));

				marketSummary.setTradeStockIndexOpenAverage(((BigDecimal) o[1])
						.setScale(FinancialUtils.SCALE, FinancialUtils.ROUND));

				marketSummary.setTradeStockIndexVolume(((BigDecimal) o[2])
						.setScale(FinancialUtils.SCALE, FinancialUtils.ROUND));
				marketSummary.setChange(((BigDecimal) o[4]));
			}
		}

		return marketSummary;
	}
}
