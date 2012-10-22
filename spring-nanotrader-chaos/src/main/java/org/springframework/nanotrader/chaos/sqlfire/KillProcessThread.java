package org.springframework.nanotrader.chaos.sqlfire;

import org.springframework.nanotrader.chaos.util.MonkeyUtils;

public class KillProcessThread extends Thread {
	private static int SLEEP_DURATION = 3000;

	public void run() {
		try {
			Thread.sleep(SLEEP_DURATION);
			MonkeyUtils.killProcess();
		} catch (InterruptedException e) {
			 System.err.println("Sleep was interupted. This is not intended behavior");
		}

	}

}
