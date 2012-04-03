package org.springframework.nanotrader.service.domain;

import java.math.BigDecimal;

public class HoldingAggregate {
	private String symbol;
	private BigDecimal percent;
	
	private BigDecimal gain;
	
	public BigDecimal getGain() {
		return gain;
	}
	public void setGain(BigDecimal gain) {
		this.gain = gain;
	}
	public BigDecimal getPercent() {
		return percent;
	}
	public void setPercent(BigDecimal percent) {
		this.percent = percent;
	}
	

	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	
	@Override
	public String toString() {
		return "HoldingAggregate [symbol=" + symbol + ", percent=" + percent
				+ ", gain=" + gain + "]";
	}
	
	
}
