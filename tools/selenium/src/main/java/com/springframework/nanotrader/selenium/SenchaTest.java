package com.springframework.nanotrader.selenium;

import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.WebElement;

import com.springframework.nanotrader.selenium.test.LoginTest;
import com.springframework.nanotrader.selenium.test.SenchaBase;
import com.springframework.nanotrader.selenium.test.TradeTest;

public class SenchaTest extends SenchaBase{
	
	private static String username; 
	
	private LoginTest loginTest = new LoginTest(baseUrl, driver);
	private TradeTest tradeTest = new TradeTest(baseUrl, driver);
	
	
	@BeforeClass
	public static void setImplicitTimeout(){
		username = "seleniumtestuser" + new Random().nextInt(1000);
		driver.manage().timeouts().implicitlyWait(1, TimeUnit.MILLISECONDS);
	}
	
	@Test(timeout=5000)
	public void registerUser(){
		System.out.println("*************************");
		System.out.println("Registering new user");
		loginTest.register(username);
		System.out.println("*************************");
	}
	
	@Test(timeout=5000)	
	public void loginUser(){
		System.out.println("Logging In");
		System.out.println("*************************");
		loginTest.login(username, "test");
		loginTest.logout();
	}
	
	@Test(timeout=5000)
	public void getQuote(){
		tradeTest.login(username, "test");
		System.out.println("Get Quote for: VMW");
		System.out.println("*************************");
		tradeTest.getQuote("VMW");
		tradeTest.logout();
	}
	
	@Test(timeout=5000)
	public void buyStock(){
		tradeTest.login(username, "test");
		WebElement quoteResult = tradeTest.getQuote("VMW");
		if (quoteResult != null) {
			System.out.println("Buying stock");
			System.out.println("*************************");
			tradeTest.buyStock("500");
		}
		tradeTest.logout();
	}
	
	@Test(timeout=5000)
	public void sellStock(){
		tradeTest.login(username, "test");
		System.out.println("Selling stocks");
		System.out.println("*************************");
		tradeTest.sellStock();
		tradeTest.logout();
	}
	
	@AfterClass
	public static void quitDriver(){
		driver.quit();
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		SeleniumTest selenium = new SeleniumTest();
		try{
		setImplicitTimeout();
		selenium.registerUser();
		selenium.buyStock();
		selenium.sellStock();
		quitDriver();
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

