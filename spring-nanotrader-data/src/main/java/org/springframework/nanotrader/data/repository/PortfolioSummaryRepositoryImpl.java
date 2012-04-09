package org.springframework.nanotrader.data.repository;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.nanotrader.data.domain.PortfolioSummary;
import org.springframework.stereotype.Repository;

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
