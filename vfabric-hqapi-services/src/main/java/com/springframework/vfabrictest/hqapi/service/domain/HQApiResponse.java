/**
 * 
 */
package com.springframework.vfabrictest.hqapi.service.domain;

import java.io.Serializable;
import java.util.List;

/**
 * @author Ilayaperumal Gopinathan
 *
 */
@SuppressWarnings("serial")
public class HQApiResponse implements Serializable {
	
	protected List<?> results = null;
	
	public List<?> getResults(){
		return results;
	}
	
	public void setResults(List<?> results){
		this.results = results;
	}

}
