/**
 * Admin Service responsible for generating user driven data  
 */
package org.springframework.nanotrader.data.service;

/**
 * @author Ilayaperumal Gopinathan
 *
 */
public interface AdminService {

	public abstract void recreateData(int count);
}
