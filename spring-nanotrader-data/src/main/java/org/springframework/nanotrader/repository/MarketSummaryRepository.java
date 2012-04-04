package org.springframework.nanotrader.repository;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.nanotrader.domain.MarketSummary;
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
		Query query = em.createQuery("SELECT SUM(q.price)/count(q) as tradeStockIndexAverage, " +
									        "SUM(q.open1)/count(q) as tradeStockIndexOpenAverage, " +
									        "SUM(q.volume) as tradeStockIndexVolume, " +
									        "SUM(q) as cnt , " + 
									        "SUM(q.change1)" + 
									        "FROM Quote q ");
	
		List<Object[]> result = query.getResultList();
		 for (Object[] o: result) { 
			 marketSummary.setTradeStockIndexAverage((BigDecimal)o[0]);
			 marketSummary.setTradeStockIndexOpenAverage((BigDecimal)o[1]);
			 marketSummary.setTradeStockIndexVolume(((BigDecimal)o[2]));
			 marketSummary.setChange(((BigDecimal)o[4]));
		 }
		
    	return marketSummary;
	}
}
