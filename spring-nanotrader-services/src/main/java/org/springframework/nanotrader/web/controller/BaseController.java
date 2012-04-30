package org.springframework.nanotrader.web.controller;

import javax.annotation.Resource;

import org.springframework.nanotrader.service.support.AdminServiceFacade;
import org.springframework.nanotrader.service.support.TradingServiceFacade;
import org.springframework.nanotrader.web.security.SecurityUtil;

public class BaseController {

	@Resource
	private TradingServiceFacade tradingServiceFacade;
	
	@Resource
	private AdminServiceFacade adminServiceFacade;
	
	@Resource
	private SecurityUtil securityUtil;
	
	public TradingServiceFacade getTradingServiceFacade() {
		return tradingServiceFacade;
	}

	public void setTradingServiceFacade(TradingServiceFacade tradingServiceFacade) {
		this.tradingServiceFacade = tradingServiceFacade;
	}
	
	public AdminServiceFacade getAdminServiceFacade() {
		return adminServiceFacade;
	}

	public void setTradingServiceFacade(AdminServiceFacade adminServiceFacade) {
		this.adminServiceFacade = adminServiceFacade;
	}

	public SecurityUtil getSecurityUtil() {
		return securityUtil;
	}

	public void setSecurityUtil(SecurityUtil securityUtil) {
		this.securityUtil = securityUtil;
	}


	
}
