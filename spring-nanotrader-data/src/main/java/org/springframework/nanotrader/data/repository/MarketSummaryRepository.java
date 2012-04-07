package org.springframework.nanotrader.data.repository;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.nanotrader.data.domain.MarketSummary;
import org.springframework.nanotrader.data.util.FinancialUtils;
import org.springframework.stereotype.Repository;

@Repository
public class MarketSummaryRepository {
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
						+ "FROM Quote q ");

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
