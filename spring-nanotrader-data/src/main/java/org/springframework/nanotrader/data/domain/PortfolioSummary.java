package org.springframework.nanotrader.data.domain;

import java.math.BigDecimal;

public class PortfolioSummary {

	private Integer numberOfHoldings = 0;

	private BigDecimal totalBasis = new BigDecimal("0.0");

	private BigDecimal totalMarketValue = new BigDecimal("0.0");

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
		if (totalBasis != null) { 
			this.totalBasis = totalBasis;
		}
		
	}

	public BigDecimal getTotalMarketValue() {
		return totalMarketValue;
	}

	public void setTotalMarketValue(BigDecimal totalMarketValue) {
		if (totalMarketValue != null) { 
			this.totalMarketValue = totalMarketValue;
		}
		
	}

	public BigDecimal getGain() {
		BigDecimal	calculatedGain = totalMarketValue.subtract(totalBasis);
		return calculatedGain;
	}

	@Override
	public String toString() {
		return "PortfolioSummary [numberOfHoldings=" + numberOfHoldings
				+ ", totalBasis=" + totalBasis + ", totalMarketValue="
				+ totalMarketValue + ", getGain()=" + getGain() + "]";
	}

}
