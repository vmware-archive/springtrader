package org.springframework.nanotrader.data.domain;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.nanotrader.data.util.FinancialUtils;


public class MarketSummary {
	
	private BigDecimal tradeStockIndexAverage;
	
	private BigDecimal tradeStockIndexVolume;
	
	private BigDecimal tradeStockIndexOpenAverage;
	
	private List<Quote> topLosers;
	
	private List<Quote> topGainers;

	private Date summaryDate;
	
	private BigDecimal percentGain;

	private BigDecimal change;
	
	public BigDecimal getChange() {
		return change;
	}

	public void setChange(BigDecimal change) {
		this.change = change;
	}

	public BigDecimal getPercentGain() {
		return FinancialUtils.computeGainPercent(getTradeStockIndexAverage(), getTradeStockIndexOpenAverage()).setScale(FinancialUtils.SCALE, FinancialUtils.ROUND);
	}

	
	public BigDecimal getTradeStockIndexAverage() {
		return tradeStockIndexAverage;
	}

	public void setTradeStockIndexAverage(BigDecimal tradeStockIndexAverage) {
		this.tradeStockIndexAverage = tradeStockIndexAverage;
	}

	public BigDecimal getTradeStockIndexVolume() {
		return tradeStockIndexVolume;
	}

	public void setTradeStockIndexVolume(BigDecimal tradeStockIndexVolume) {
		this.tradeStockIndexVolume = tradeStockIndexVolume;
	}

	public BigDecimal getTradeStockIndexOpenAverage() {
		return tradeStockIndexOpenAverage;
	}

	public void setTradeStockIndexOpenAverage(
			BigDecimal tradeStockIndexOpenAverage) {
		this.tradeStockIndexOpenAverage = tradeStockIndexOpenAverage;
	}

	public List<Quote> getTopLosers() {
		return topLosers;
	}

	public void setTopLosers(List<Quote> topLosers) {
		this.topLosers = topLosers;
	}

	public List<Quote> getTopGainers() {
		return topGainers;
	}

	public void setTopGainers(List<Quote> topGainers) {
		this.topGainers = topGainers;
	}

	public Date getSummaryDate() {
		return summaryDate;
	}

	public void setSummaryDate(Date summaryDate) {
		this.summaryDate = summaryDate;
	}

	@Override
	public String toString() {
		return "MarketSummary [tradeStockIndexAverage="
				+ tradeStockIndexAverage + ", tradeStockIndexVolume="
				+ tradeStockIndexVolume + ", tradeStockIndexOpenAverage="
				+ tradeStockIndexOpenAverage + ", topLosers=" + topLosers
				+ ", topGainers=" + topGainers + ", summaryDate=" + summaryDate
				+ ", percentGain=" + percentGain + "]";
	}
	


}
