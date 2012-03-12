package org.springframework.nanotrader.service.domain;

import java.math.BigDecimal;

public class PortfolioSummary {
	private Integer numberOfHoldings = 0;
	private BigDecimal totalBasis = new BigDecimal(0.0);
	private BigDecimal totalMarketValue = new BigDecimal(0.0);
	
	
	public Integer getNumberOfHoldings() {
		return numberOfHoldings;
	}
	public void setNumberOfHoldings(Integer numberOfHoldings) {
		this.numberOfHoldings = numberOfHoldings;
	}
	public BigDecimal getTotalBasis() {
		return totalBasis;
	}
	public void setTotalBasis(BigDecimal totalBasis) {
		this.totalBasis = totalBasis;
	}
	public BigDecimal getTotalMarketValue() {
		return totalMarketValue;
	}
	public void setTotalMarketValue(BigDecimal totalMarketValue) {
		this.totalMarketValue = totalMarketValue;
	}
	public BigDecimal getGain() {
		BigDecimal calculatedGain = new BigDecimal(0.0);
		if (totalMarketValue != null && totalBasis!= null) { 
			calculatedGain = totalMarketValue.subtract(totalBasis);
		}
		return calculatedGain;
	}
	
	
	@Override
	public String toString() {
		return "PortfolioSummary [numberOfHoldings=" + numberOfHoldings
				+ ", totalBasis=" + totalBasis + ", totalMarketValue="
				+ totalMarketValue + ", getGain()=" + getGain() + "]";
	}

	
}
