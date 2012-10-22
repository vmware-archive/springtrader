package org.springframework.nanotrader.chaos.sqlfire;


/**
 * SQLFire stored procedure used to terminate running JVM process. A background 
 * thread is created and sleeps for three seconds allowing the stored procedure
 * to return successfully to the client. The background thread also prevents the failure 
 * from triggering client side fail-over and retry, which would ultimately terminate all 
 * SQLFire members and would not be the 
 * desired behavior (which is to terminate a single member of the cluster).
 * 
 * @author Brian Dussault
 */
public class ChaosFunction {
	

	public static void killProcess() {
		KillProcessThread thread = new KillProcessThread();
		thread.start();
	}
}
