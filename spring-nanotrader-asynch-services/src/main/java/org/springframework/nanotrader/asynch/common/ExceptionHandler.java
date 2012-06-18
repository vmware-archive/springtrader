package org.springframework.nanotrader.asynch.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.integration.Message;
import org.springframework.integration.MessagingException;
import org.springframework.integration.annotation.ServiceActivator;

public class ExceptionHandler {
	@ServiceActivator
	public void rethrowException(Message message) {
		MessagingException me = (MessagingException) message.getPayload();
		System.out.println("ERORRORR-------------");
		throw new MessagingException("Rethrowing exception", me);

	}

}
