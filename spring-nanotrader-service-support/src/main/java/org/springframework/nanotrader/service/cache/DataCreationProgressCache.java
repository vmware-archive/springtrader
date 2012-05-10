package org.springframework.nanotrader.service.cache;

import org.springframework.stereotype.Service;

@Service
public class DataCreationProgressCache {

	private Integer progresscount;

	public Integer getProgresscount() {
		return progresscount;
	}

	public void setProgresscount(Integer progresscount) {
		this.progresscount = progresscount;
	}

}
