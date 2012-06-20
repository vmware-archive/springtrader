package org.springframework.nanotrader.asynch.common;

import org.springframework.integration.Message;
import org.springframework.integration.MessagingException;
import org.springframework.integration.annotation.ServiceActivator;

public class ExceptionHandler {
	@ServiceActivator
	public void rethrowException(Message<?> message) {
		MessagingException me = (MessagingException) message.getPayload();
		throw new MessagingException("Rethrowing exception", me);

	}

}
