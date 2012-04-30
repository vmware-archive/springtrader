package org.springframework.nanotrader.service.domain;

import java.io.Serializable;

/**
 * 
 * @author Ilayaperumal Gopinathan
 * @author
 */

public class RecreateData implements Serializable {

	private String usercount;

	public String getUsercount() {
		return this.usercount;
	}

	public void setUsercount(String usercount) {
		this.usercount = usercount;
	}
}
