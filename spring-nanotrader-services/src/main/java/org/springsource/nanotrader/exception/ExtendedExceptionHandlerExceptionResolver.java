package org.springsource.nanotrader.exception;

import java.lang.reflect.Method;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.method.annotation.ExceptionHandlerMethodResolver;
import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver;
import org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod;

/**
 *  ExtendedExceptionHandlerExceptionResolver provides custom exception resolution through the 
 *  invocation of global exception handlers.
 *  
 *  @author Brian Dussault 
 *  @author
 */
public class ExtendedExceptionHandlerExceptionResolver extends ExceptionHandlerExceptionResolver {

	private Object handler;

	private ExceptionHandlerMethodResolver methodResolver;

	/**
	 * Provide a handler with @{@link ExceptionHandler} methods.
	 */
	public void setExceptionHandler(Object handler) {
		this.handler = handler;
		this.methodResolver = new ExceptionHandlerMethodResolver(handler.getClass());
	}

	@Override
	protected ServletInvocableHandlerMethod getExceptionHandlerMethod(HandlerMethod handlerMethod, Exception exception) {
		ServletInvocableHandlerMethod result = super.getExceptionHandlerMethod(handlerMethod, exception);
		if (result != null) {
			return result;
		}
		Method method = this.methodResolver.resolveMethod(exception);
		return (method != null) ? new ServletInvocableHandlerMethod(this.handler, method) : null;
	}

}