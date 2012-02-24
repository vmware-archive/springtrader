package org.springsource.nanotrader.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *  GlobalExceptionHandler provides a consistent error handling facility for 
 *  nanotraders REST based API
 *  
 *  @author Brian Dussault 
 *  @author
 */

public class GlobalExceptionHandler {
	private static final String FAILURE_MESSSAGE = "An error has occured while processing the request: ";
	private static final String NO_RECORDS_FOUND_MESSSAGE = "No records found for the specified criteria";
	
	@ExceptionHandler(value = NoRecordsFoundException.class)
	@ResponseStatus( HttpStatus.NOT_FOUND )
	public @ResponseBody ServiceException handle(NoRecordsFoundException exception) {
		ServiceException serviceException = new ServiceException(NO_RECORDS_FOUND_MESSSAGE );
		return serviceException;
	}
	
	@ExceptionHandler(value = HttpMediaTypeNotSupportedException.class)
	@ResponseStatus( HttpStatus.UNSUPPORTED_MEDIA_TYPE )
	public @ResponseBody ServiceException handle(HttpMediaTypeNotSupportedException exception) {
		ServiceException serviceException = new ServiceException(FAILURE_MESSSAGE + exception.getMessage() );
		return serviceException;
	}
	
	
	@ExceptionHandler(value = Exception.class)
	@ResponseStatus( HttpStatus.BAD_REQUEST )
	public @ResponseBody ServiceException handle(Exception exception) {
		ServiceException serviceException = new ServiceException(FAILURE_MESSSAGE + exception.getMessage() );
		return serviceException;
	}
	
	
}
