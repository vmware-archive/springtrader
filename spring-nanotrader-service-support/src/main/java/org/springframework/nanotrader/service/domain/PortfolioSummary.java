/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.nanotrader.service.domain;

import java.math.BigDecimal;

/**
 * @author Brian Dussault
 *
 */
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
