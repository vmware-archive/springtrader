/**
 * 
 */
package com.springframework.nanotrader.selenium.model;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
public interface PortfolioElement {

	public String NAVBAR_PORTFOLIO = "nb-portfolio";

	public String SELL_FIRST_PORTFOLIO = "id('list-of-holdings')//a[@index='0']";

	public String SELL_ORDER_OK = "loh-sell";

	public String SELL_ORDER_CANCEL = "//a[@class='btn btn-inverse' and @data-dismiss='modal']";

}
