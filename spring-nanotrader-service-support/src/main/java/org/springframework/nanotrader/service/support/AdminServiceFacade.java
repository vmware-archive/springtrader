/**
 * Admin Service responsible for generating user driven data  
 */
package org.springframework.nanotrader.service.support;

/**
 * @author Ilayaperumal Gopinathan
 *
 */
public interface AdminServiceFacade {

	public abstract void recreateData(int count);
	
}
