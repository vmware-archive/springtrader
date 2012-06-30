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
package org.springframework.nanotrader.data.domain;

import java.math.BigDecimal;

public class PortfolioSummary {

	private Integer numberOfHoldings = 0;

	private BigDecimal totalBasis =  BigDecimal.ZERO;

	private BigDecimal totalMarketValue = BigDecimal.ZERO;

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
