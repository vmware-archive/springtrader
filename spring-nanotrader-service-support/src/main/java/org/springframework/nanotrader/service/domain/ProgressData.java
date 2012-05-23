package org.springframework.nanotrader.service.domain;

import java.io.Serializable;

/**
 * 
 * @author Ilayaperumal Gopinathan
 */

@SuppressWarnings("serial")
public class ProgressData implements Serializable {

	private Integer usercount;

	public Integer getUsercount() {
		return this.usercount;
	}

	public void setUsercount(Integer usercount) {
		this.usercount = usercount;
	}

	@Override
	public String toString() {
		return "ProgressData [usercount=" + usercount + "]";
	}
}
