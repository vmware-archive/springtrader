package com.springframework.nanotrader.selenium;

import java.util.Random;

import org.openqa.selenium.WebElement;

import com.springframework.nanotrader.selenium.test.LoginTest;
import com.springframework.nanotrader.selenium.test.TradeTest;

public class SeleniumTest {
	

	LoginTest loginTest = new LoginTest();
	TradeTest tradeTest = new TradeTest();
	
	public void runLoginTest(String username){
		System.out.println("*************************");
		System.out.println("Registering new user");
		loginTest.register(username);
		System.out.println("*************************");
		System.out.println("Logging In");
		System.out.println("*************************");
		loginTest.login(username, "test");
		loginTest.driver.quit();
	}
	
	public void runTradeTest(String username){
		tradeTest.login(username, "test");
		System.out.println("Get Quote for: VMW");
		System.out.println("*************************");
		WebElement quoteResult = tradeTest.getQuote("VMW");
		if (quoteResult != null) {
			System.out.println("Buying stocks");
			System.out.println("*************************");
			tradeTest.buyStock("500");
		}
		System.out.println("Selling stocks");
		System.out.println("*************************");
		tradeTest.sellStock();
		tradeTest.driver.quit();
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String username = "seleniumtestuser" + new Random().nextInt(1000);
		SeleniumTest selenium = new SeleniumTest();
		try{
		selenium.runLoginTest(username);
		selenium.runTradeTest(username);
		System.out.println("Tests completed Successfully");
		System.out.println("*************************");
		} catch (Exception e){
			System.out.println("*************************");
			System.out.println("Test failed with the below exception:");
			System.out.println("*************************");
			e.printStackTrace();
		}
		
	}
}
