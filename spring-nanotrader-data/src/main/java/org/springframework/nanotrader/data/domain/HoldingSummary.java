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
import java.util.List;

public class HoldingSummary {
	private BigDecimal holdingsTotalGains;
	private List<HoldingAggregate> holdingRollups;
	
	public BigDecimal getHoldingsTotalGains() {
		return holdingsTotalGains;
	}
	public void setHoldingsTotalGains(BigDecimal holdingsTotalGains) {
		this.holdingsTotalGains = holdingsTotalGains;
	}
	
	public List<HoldingAggregate> getHoldingRollups() {
		return holdingRollups;
	}
	public void setHoldingRollups(List<HoldingAggregate> holdingRollups) {
		this.holdingRollups = holdingRollups;
	}

	@Override
	public String toString() {
		return "HoldingSummary [holdingsTotalGains=" + holdingsTotalGains
				+ ", holdingRollup=" + holdingRollups + "]";
	}


	
}
