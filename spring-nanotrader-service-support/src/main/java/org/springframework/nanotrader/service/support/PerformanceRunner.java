package org.springframework.nanotrader.service.support;

import java.io.IOException;
import java.security.PublicKey;
import java.util.concurrent.TimeUnit;

import net.schmizz.sshj.SSHClient;
import net.schmizz.sshj.common.IOUtils;
import net.schmizz.sshj.connection.channel.direct.Session;
import net.schmizz.sshj.connection.channel.direct.Session.Command;
import net.schmizz.sshj.transport.verification.HostKeyVerifier;

public class PerformanceRunner implements Runnable {

	private String vmName;

	private String vmUser;

	private String vmPwd;

	private String installOpts;

	private String serverUrl;

	// Count can be number of orders or users depending on the type
	private String count;

	// Type can be single user/fixed order or multi-users/random orders
	private String type;

	PerformanceRunner(String count, String type, String vmName, String vmUser, String vmPwd, String installOpts,
			String serverUrl) {
		this.vmName = vmName;
		this.vmUser = vmUser;
		this.vmPwd = vmPwd;
		this.installOpts = installOpts;
		this.serverUrl = serverUrl;
		this.count = count;
		this.type = type;
	}

	@Override
	public void run() {
		try {
			if (installOpts.equalsIgnoreCase("true")) {
				exec("rm -fR ~/perf-test");
				exec("mkdir ~/perf-test");
				exec("wget -P ~/perf-test/ " + serverUrl + "/spring-nanotrader-web/files/DataGenerator.zip");
				exec("unzip ~/perf-test/DataGenerator.zip -d ~/perf-test/");
				exec("rm -fr ~/performanceTest*");
				exec("wget " + serverUrl + "/spring-nanotrader-web/files/performanceTest.sh");
				exec("chmod 755 ~/performanceTest.sh");
			}
			exec("~/performanceTest.sh " + count + " " + type + " " + serverUrl);
		}
		catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}

	private class NullHostKeyVerifier implements HostKeyVerifier {
		@Override
		public boolean verify(String arg0, int arg1, PublicKey arg2) {
			return true;
		}
	}

	private void exec(String command) throws IOException {
		SSHClient ssh = new SSHClient();
		ssh.loadKnownHosts();
		ssh.addHostKeyVerifier(new NullHostKeyVerifier());
		ssh.connect(vmName);
		ssh.authPassword(vmUser, vmPwd);

		final Session session = ssh.startSession();
		try {
			final Command cmd = session.exec(command);
			System.out.println(IOUtils.readFully(cmd.getInputStream()).toString());
			cmd.join(10, TimeUnit.SECONDS);
			System.out
					.println("\n** exit status: " + cmd.getExitStatus() + " for the cmd " + command + " on " + vmName);
			if (cmd.getExitStatus() != 0) {
				System.out.println("Command [" + command + "] failed with exit status :" + cmd.getExitStatus() + " on "
						+ vmName);
				// System.exit(cmd.getExitStatus());
			}
		}
		finally {
			ssh.close();
		}
		ssh.disconnect();
	}
}
