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
public class HoldingAggregateRepository {
	private static int TOP_N = 2;
	@PersistenceContext
	private EntityManager em;

	public void setEntityManager(EntityManager em) {
		this.em = em;
	}

	
	public HoldingSummary findHoldingAggregated(Integer accountId) {
	
		HoldingSummary holdingSummary = new HoldingSummary();
		List<HoldingAggregate> holdingRollups = new ArrayList<HoldingAggregate>();
		// Filter out the losers (gains =< 0)
		Query query = em.createQuery("SELECT  h.quoteSymbol, sum(q.price * h.quantity) - SUM(h.purchaseprice * h.quantity) as gain FROM Holding h, Quote q Where h.accountAccountid =:accountId and h.quoteSymbol=q.symbol GROUP BY  h.quoteSymbol HAVING  SUM(q.price * h.quantity) - SUM(h.purchaseprice * h.quantity) >= 0 ORDER BY gain desc");
		query.setParameter("accountId", accountId);
		BigDecimal totalGains = new BigDecimal(0);
		List<Object[]> result = query.getResultList();
		int counter = 0;
		// Need to loop over all the aggregated symbols to calculate the totalGain of all the stocks
		// but only want the top N stocks returned.
		for (Object[] o : result) {
			HoldingAggregate summary = new HoldingAggregate();
			String symbol = (String) o[0];
			BigDecimal gain = (BigDecimal) o[1];
			totalGains = totalGains.add(gain);
			if (counter < TOP_N) { 
				summary.setSymbol(symbol);
				summary.setGain(gain);
				holdingRollups.add(summary);
			}
			counter++;
		}
		holdingSummary.setHoldingsTotalGains(totalGains);
		return calculatePercentages(holdingSummary, holdingRollups);
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
