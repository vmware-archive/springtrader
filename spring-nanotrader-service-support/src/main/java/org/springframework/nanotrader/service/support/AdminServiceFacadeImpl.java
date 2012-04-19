/**
 * 
 */
package org.springframework.nanotrader.service.support;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.nanotrader.data.service.AdminService;
import org.springframework.stereotype.Service;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
@Service
public class AdminServiceFacadeImpl implements AdminServiceFacade {

	private static Logger log = LoggerFactory.getLogger(AdminServiceFacadeImpl.class);

	@Resource
	private AdminService adminService;

	@Override
	public void recreateData(int count) {
		adminService.recreateData(count);
	}
}
