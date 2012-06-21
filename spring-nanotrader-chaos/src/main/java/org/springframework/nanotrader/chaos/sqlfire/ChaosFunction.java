package org.springframework.nanotrader.chaos.sqlfire;

import org.springframework.nanotrader.chaos.util.MonkeyUtils;

/**
 * SQLFire stored procedure used to terminate running JVM process
 * 
 * @author Brian Dussault
 */
public class ChaosFunction {
	

	public static void killProcess() {
		MonkeyUtils.killProcess();
	}
}
