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
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.nanotrader.data.domain.HoldingAggregate;
import org.springframework.nanotrader.data.domain.HoldingSummary;
import org.springframework.nanotrader.data.util.FinancialUtils;
import org.springframework.stereotype.Repository;

@Repository
public class HoldingAggregateRepositoryImpl implements HoldingAggregateRepository {
	private static int TOP_N = 4;
	@PersistenceContext
	private EntityManager em;

	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	
	@SuppressWarnings("unchecked")
	@Override
	public HoldingSummary findHoldingAggregated(Integer accountId) {
	
		HoldingSummary holdingSummary = new HoldingSummary();
		List<HoldingAggregate> holdingRollups = new ArrayList<HoldingAggregate>();
		// Filter out the losers (gains =< 0)
		Query query = em.createQuery("SELECT  h.quoteSymbol, sum(q.price * h.quantity) - SUM(h.purchaseprice * h.quantity) as gain FROM Holding h, Quote q Where h.accountAccountid =:accountId and h.quoteSymbol=q.symbol GROUP BY  h.quoteSymbol HAVING  SUM(q.price * h.quantity) - SUM(h.purchaseprice * h.quantity) > 0 ORDER BY gain desc");
		query.setParameter("accountId", accountId);
		BigDecimal totalGains = new BigDecimal(0 );
		totalGains = totalGains.setScale(FinancialUtils.SCALE, FinancialUtils.ROUND);
		List<Object[]> result = query.getResultList();
		int counter = 0;
		// Need to loop over all the aggregated symbols to calculate the totalGain of all the stocks
		// but only want the top N stocks returned.
		for (Object[] o : result) {
			HoldingAggregate summary = new HoldingAggregate();
			String symbol = (String) o[0];
			BigDecimal gain = (BigDecimal) o[1];
			gain = gain.setScale(FinancialUtils.SCALE, FinancialUtils.ROUND);
			totalGains = totalGains.add(gain);
			if (counter < TOP_N) { 
				summary.setSymbol(symbol);
				summary.setGain(gain);
				holdingRollups.add(summary);
			}
			counter++;
		}
		holdingSummary.setHoldingsTotalGains(totalGains);
		HoldingSummary summary = calculatePercentages(holdingSummary, holdingRollups);
		return summary;
	}
	
	private HoldingSummary calculatePercentages(HoldingSummary holdingSummary, List<HoldingAggregate> holdingRollups) { 
		double hundredPercent = 100;
		BigDecimal gainsRemainder = holdingSummary.getHoldingsTotalGains();
		for (HoldingAggregate ha: holdingRollups) { 
			BigDecimal percent = FinancialUtils.calculateGainPercentage(ha.getGain(), holdingSummary.getHoldingsTotalGains());
			ha.setPercent(percent);
			hundredPercent = hundredPercent- ha.getPercent().doubleValue();
			gainsRemainder = gainsRemainder.subtract(ha.getGain());
			
		}
		// Since we are only showing the Top N symbols, lump all others into the Other bucket
		// at this point if we are still @ 100%, then no records were found
		// also trying to prevent Other showing simply due to rounding (hence  > 1) 
		if (hundredPercent > 1 && hundredPercent != 100) {
			HoldingAggregate summary = new HoldingAggregate();
			summary.setSymbol("Other");
			summary.setPercent(new BigDecimal(hundredPercent));
			summary.setGain(gainsRemainder);
			holdingRollups.add(summary);
		}
		holdingSummary.setHoldingRollups(holdingRollups);
		
		return holdingSummary;
	}
}
