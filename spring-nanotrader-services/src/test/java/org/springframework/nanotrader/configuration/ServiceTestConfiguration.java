package org.springframework.nanotrader.configuration;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Matchers.eq;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.nanotrader.domain.Account;
import org.springframework.nanotrader.domain.Accountprofile;
import org.springframework.nanotrader.domain.Holding;
import org.springframework.nanotrader.domain.Order;
import org.springframework.nanotrader.domain.Quote;
import org.springframework.nanotrader.service.TradingService;
import org.springframework.nanotrader.service.TradingServiceImpl;

/**
 *  ServiceTestConfiguration provides test objects and mock service layer for unit tests.
 *  
 *  @author Brian Dussault 
 *  @author
 */

@Configuration
@Profile("test")
public class ServiceTestConfiguration  {
	//Holding constants
	public static Integer HOLDING_ID = 100;
	public static Integer ACCOUNT_ID = 500;
	public static BigDecimal PURCHASE_PRICE = new BigDecimal(50000);
	public static String SYMBOL = "VMW";
	public static BigDecimal QUANTITY = new BigDecimal(200);
	
	//Account profile constants
	public static Integer PROFILE_ID 	=  400;
	public static String USER_ID 		= "bdussault";
	public static String EMAIL 		= "anon@springsource.com";
	public static String FULL_NAME 	= "John Doe";
	public static String CC_NUMBER 	= "999999999";
	public static String ADDRESS 		= "45 Test Dr.";
	public static Integer NOT_A_VALID_PROFILE = 900;
	
	//Order constants
	public static Integer ORDER_ID 	=  602;
	public static BigDecimal ORDER_PRICE = new BigDecimal("100");
	public static BigDecimal ORDER_QUANTITY = new BigDecimal("200");
	public static String ORDER_TYPE_BUY	=  "buy";
	public static String ORDER_STATUS_CLOSED	=  "closed";
	
	//Quote constants
	public static Integer QUOTE_ID = 1;
	public static String COMPANY_NAME	=  "VMware";
	public static BigDecimal HIGH	=  new BigDecimal(50.02);
	public static BigDecimal OPEN	=  new BigDecimal(40.11);
	public static BigDecimal VOLUME	=  new BigDecimal(3000);
	public static BigDecimal CURRENT_PRICE	=  new BigDecimal(48.44);
	
	@Bean 
	public TradingService tradingService() {
		TradingService tradingService = Mockito.mock(TradingService.class);
		when(tradingService.findHolding(100)).thenReturn(holding());
		when(tradingService.findHoldingsByAccountId(400)).thenReturn(holdings());
		when(tradingService.updateHolding(any(Holding.class))).thenReturn(holding());
		when(tradingService.findAccountProfile(400)).thenReturn(accountProfile());
		when(tradingService.findAccountProfile(NOT_A_VALID_PROFILE)).thenReturn(null);
		when(tradingService.updateAccountProfile(any(Accountprofile.class))).thenReturn(accountProfile());
		when(tradingService.findOrder(999)).thenReturn(order());
		when(tradingService.saveOrder(any(Order.class), any(Boolean.class))).thenReturn(null);
		when(tradingService.updateOrder(any(Order.class))).thenReturn(null);
		when(tradingService.findOrdersByStatus(eq(2), any(String.class))).thenReturn(orders());
		when(tradingService.findOrders(eq(2))).thenReturn(orders());
		when(tradingService.findQuoteBySymbol(eq("VMW"))).thenReturn(quote());
		return tradingService ;
	}
	
	@Bean 
	public Holding holding() {
		Holding holding = new Holding();
		holding.setHoldingid(HOLDING_ID);
		holding.setAccountAccountid(ACCOUNT_ID);
		holding.setPurchasedate(new Date(1329759342904l));
		holding.setQuoteSymbol(SYMBOL);
		holding.setPurchaseprice(PURCHASE_PRICE);
		holding.setQuantity(QUANTITY);
		return holding;
	}

	@Bean 
	public Accountprofile accountProfile() {
		Accountprofile accountProfile = new Accountprofile();
		accountProfile.setProfileid(PROFILE_ID);
		accountProfile.setUserid(USER_ID);
		accountProfile.setAddress(ADDRESS);
		accountProfile.setEmail(EMAIL);
		accountProfile.setFullname(FULL_NAME);
		accountProfile.setCreditcard(CC_NUMBER);
		return accountProfile;
	}
	
	@Bean 
	public Order order() {
		Order order = new Order();
		Account account = new Account();
		account.setAccountid(ACCOUNT_ID);
		order.setAccountAccountid(account);
		order.setOrderid(ORDER_ID);
		order.setPrice(ORDER_PRICE);
		order.setOrderstatus(ORDER_STATUS_CLOSED);
		order.setOrdertype(ORDER_TYPE_BUY);
		order.setOpendate(new Date(1329759342904l));
		order.setCompletiondate(new Date(1329759342904l));
		order.setHoldingHoldingid(holding());
		order.setQuantity(ORDER_QUANTITY);
		order.setOrderfee(TradingServiceImpl.DEFAULT_ORDER_FEE);
		order.setQuote(quote());
		return order;
	}

	public Quote quote() { 
		Quote quote = new Quote();
		quote.setQuoteid(QUOTE_ID);
		quote.setSymbol(SYMBOL);
		quote.setCompanyname(COMPANY_NAME);
		quote.setHigh(HIGH);
		quote.setOpen1(OPEN);
		quote.setVolume(VOLUME);
		quote.setPrice(CURRENT_PRICE);
		return quote;
	}
	
	public List<Order> orders() {
		List<Order> orders = new ArrayList<Order>();
		orders.add(order());
		return orders;
	}
	
	public List<Holding> holdings() {
		List<Holding> holdings = new ArrayList<Holding>();
		holdings.add(holding());
		return holdings;
	}

}
