/**
 * 
 */
package com.springframework.nanotrader.selenium.model;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
public interface TradeElement {

	public String NAVBAR_TRADE = "nb-trade";

	public String TRD_QUOTE_INPUT = "quote-input";

	public String TRD_QUOTE_SUBMIT = "getQuoteBtn";

	public String TRD_QUOTE_RESULT = "quote-result";

	public String TRD_QUANTITY = "quantity-input";

	public String TRD_BUY_SUBMIT = "buyBtn";
	
	// Modal pop-up
	public String BUY_ORDER_MODAL_MESSAGE = "id('myModal')/div[@class='modal-body']//tr[contains(td,'Your order is submitted for processing')]";
	
	public String BUY_ORDER_MODAL_OK = "id('myModal')//a[text() = 'OK']";	

}
