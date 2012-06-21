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

import org.springframework.nanotrader.data.domain.PortfolioSummary;
import org.springframework.stereotype.Repository;

/**
 * @author Brian Dussault
 *
 */
@Repository
public class PortfolioSummaryRepositoryImpl implements PortfolioSummaryRepository {

	@PersistenceContext
	private EntityManager em;
	
	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	@Override
	public PortfolioSummary findPortfolioSummary(Integer accountId) {
		PortfolioSummary portfolioSummary = new PortfolioSummary();
		Query query = em.createQuery("SELECT SUM(h.purchaseprice * h.quantity) as purchaseBasis, sum(q.price * h.quantity) as marketValue, count(h) FROM Holding h, Quote q Where h.accountAccountid =:accountId and h.quoteSymbol=q.symbol  ORDER BY marketValue desc");
		query.setParameter("accountId", accountId);
		@SuppressWarnings("unchecked")
		List<Object[]> result = query.getResultList();
		for (Object[] o: result) {
			BigDecimal price = (BigDecimal)o[0];
			BigDecimal marketValue = (BigDecimal)o[1];
			Long countOfHoldings = (Long)o[2];
			portfolioSummary.setTotalBasis(price);
			portfolioSummary.setTotalMarketValue(marketValue);
			portfolioSummary.setNumberOfHoldings(countOfHoldings.intValue());
		}


		return portfolioSummary;
	}
}
