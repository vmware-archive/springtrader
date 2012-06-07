/**
 * 
 */
package com.springframework.nanotrader.selenium.test;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.springframework.nanotrader.selenium.model.DashboardElement;
import com.springframework.nanotrader.selenium.model.LoginElement;
import com.springframework.nanotrader.selenium.model.PortfolioElement;
import com.springframework.nanotrader.selenium.model.TradeElement;
import com.springframework.nanotrader.selenium.model.UserElement;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
public class TestBase implements LoginElement, UserElement, TradeElement, PortfolioElement, DashboardElement {

	public String BASE_URL = "http://localhost:8080/spring-nanotrader-web";

	public WebDriver driver = new FirefoxDriver();

	public void login(String username, String password) {
		try {
			// Go to login page
			driver.get(BASE_URL + "/#login");
			// Fill in username & password
			typeTextById(USERNAME, username);
			typeTextById(PASSWORD, password);
			// Submit Login
			clickElementById(LOGIN);
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public void typeTextById(String idLocator, String value) {
		driver.findElement(By.id(idLocator)).sendKeys(value);
	}

	public void clickElementById(String idLocator) {
		driver.findElement(By.id(idLocator)).click();
	}

	public void clickElementByXpath(String xpathLocator) {
		driver.findElement(By.xpath(xpathLocator)).click();
	}

	public WebElement waitForElementById(final String idLocator) {
		return new WebDriverWait(driver, 5).until(new ExpectedCondition<WebElement>() {
			public WebElement apply(WebDriver d) {
				return d.findElement(By.id(idLocator));
			}
		});
	}

	public WebElement waitForElementByXpath(final String xpathLocator) {
		return new WebDriverWait(driver, 5).until(new ExpectedCondition<WebElement>() {
			public WebElement apply(WebDriver d) {
				return d.findElement(By.xpath(xpathLocator));
			}
		});
	}
}
