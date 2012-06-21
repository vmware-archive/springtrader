package org.springframework.nanotrader.chaos.sqlfire;

import org.springframework.nanotrader.chaos.util.MonkeyUtils;

public class ChaosFunction {
	

	public static void killProcess() {
		MonkeyUtils.killProcess();
	}
}
