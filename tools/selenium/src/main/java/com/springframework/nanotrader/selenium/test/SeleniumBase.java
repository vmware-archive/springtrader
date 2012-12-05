/**
 * 
 */
package com.springframework.nanotrader.selenium.test;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

/**
 * @author Ilayaperumal Gopinathan
 *
 */
public class SeleniumBase {
	
	public static String baseUrl = "http://localhost:8080/spring-nanotrader-web";

	public static WebDriver driver = new FirefoxDriver();

}
