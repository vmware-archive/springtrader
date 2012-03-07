package org.springframework.nanotrader.web.exception;

/**
 *  ServiceException provides a simple representation for exceptions
 *  
 *  @author Brian Dussault 
 *  @author
 */
public class ServiceException  {

	private final String detail;
	
	public ServiceException(String detail) {
		this.detail = detail;

	}

	public String getDetail() {
		return detail;
	}


}