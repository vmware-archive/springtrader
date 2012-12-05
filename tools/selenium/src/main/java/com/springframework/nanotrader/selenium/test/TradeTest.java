/**
 * 
 */
package com.springframework.nanotrader.selenium.test;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
public class TradeTest extends TestBase {
	
	public TradeTest(String baseUrl, WebDriver driver){
		super(baseUrl, driver);
	}
	

	public WebElement getQuote(String symbol) {
		//waitForElementById(NAVBAR_TRADE);
		clickElementById(NAVBAR_TRADE);
		waitForElementById(TRD_QUOTE_INPUT);
		typeTextById(TRD_QUOTE_INPUT, symbol);
		clickElementById(TRD_QUOTE_SUBMIT);
		return waitForElementById(TRD_QUANTITY);
	}

	public void buyStock(String quantity) {
		typeTextById(TRD_QUANTITY, "5");
		clickElementById(TRD_BUY_SUBMIT);
		waitForElementByXpath(BUY_ORDER_MODAL_MESSAGE);
		clickElementByXpath(BUY_ORDER_MODAL_OK);
	}

	public void sellStock() {
		//waitForElementById(NAVBAR_PORTFOLIO);
		clickElementById(NAVBAR_PORTFOLIO);
		//waitForElementByXpath(SELL_FIRST_PORTFOLIO);
		clickElementByXpath(SELL_FIRST_PORTFOLIO);
		waitForElementById(SELL_ORDER_OK);
		//waitForElementByXpath(SELL_ORDER_CANCEL);
		//clickElementByXpath(SELL_ORDER_CANCEL);
		/*waitForElementById(NAVBAR_PORTFOLIO);
		waitForElementByXpath(SELL_FIRST_PORTFOLIO);
		clickElementByXpath(SELL_FIRST_PORTFOLIO);
		waitForElementByXpath(SELL_ORDER_OK);
		clickElementByXpath(SELL_ORDER_CANCEL);*/
		clickElementById(SELL_ORDER_OK);
	}

}
