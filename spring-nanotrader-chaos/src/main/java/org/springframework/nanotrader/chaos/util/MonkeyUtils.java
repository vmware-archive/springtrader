package org.springframework.nanotrader.chaos.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

;

/**
 * Utility class which logs chaos messages and prints mascot
 * 
 * @author Brian Dussault
 */

public class MonkeyUtils {
	private static String[] quotes = new String[6];
	private static String SEPERATOR = "=============================================================================================";
	static {
		quotes[0] = "I didn't touch the server.";
		quotes[1] = "I tested my code.";
		quotes[2] = "Must be a network issue.";
		quotes[3] = "This is a scheduled outage... Isn't it?";
		quotes[4] = "Does this mean I'm not getting a promotion?";
		quotes[5] = "There was no requirement to handle errors. This is an enhancement request.";
	}

	public static void logChaos() {
		System.out.println(SEPERATOR);
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
		Date date = new Date();
		System.out.println("Chaos occured at: " + dateFormat.format(date));
		getMascot();
		System.out.println();
		System.out.println("Chaos Monkey's excuse of the day: \"" + getQuote() + "\"");
		System.out.println(SEPERATOR);

	}

	private static String getQuote() {
		int randomElemenetIndex = (int) (Math.random() * 10) % 6;
		return quotes[randomElemenetIndex];
	}

	private static void getMascot() {

		System.out.println("    .~~.  .-'~~~~~'-.  .~~.");
		System.out.println("   / .. \\/  .-. .-.  \\/ .. \\");
		System.out.println("  | |  '|  /   Y   \\  |'  | |");
		System.out.println("  | \\   \\  \\ 0 | 0 /  /   / |");
		System.out.println("  \\ '- ,\\.-\"`` ``\"-./, -'  /");
		System.out.println("   `'-' /_   ^ ^   _\\ '-'`");
		System.out.println("    .--'|  \\._ _ _./  |'--.");
		System.out.println("  {`    \\   \\-----/   /   `}");
		System.out.println(" {       ' ._______.'        }");
		System.out.println("");

	}
	
	public static void killProcess() { 
		logChaos();
		System.exit(0);
	}

	public static void main(String args[]) {
		MonkeyUtils.logChaos();
	}

}
