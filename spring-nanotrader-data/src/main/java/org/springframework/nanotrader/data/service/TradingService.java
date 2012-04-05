package org.springframework.nanotrader.data.service;

import java.util.List;
import java.util.Set;

import org.springframework.nanotrader.data.domain.Account;
import org.springframework.nanotrader.data.domain.Accountprofile;
import org.springframework.nanotrader.data.domain.Holding;
import org.springframework.nanotrader.data.domain.HoldingSummary;
import org.springframework.nanotrader.data.domain.MarketSummary;
import org.springframework.nanotrader.data.domain.Order;
import org.springframework.nanotrader.data.domain.PortfolioSummary;
import org.springframework.nanotrader.data.domain.Quote;


public interface TradingService {

	public static final String ORDER_TYPE_BUY = "buy";

	public static final String ORDER_TYPE_SELL = "sell";
	
	public abstract Accountprofile login(String username, String password);
	
	public abstract void logout(String authtoken);
	
	public abstract Accountprofile findAccountProfile(Integer id);
	
	public abstract Accountprofile findAccountByUserId(String id);

	public abstract Accountprofile saveAccountProfile(Accountprofile accountProfile);

	public abstract Accountprofile updateAccountProfile(Accountprofile accountProfile, String username);

	public abstract Holding findHolding(Integer id, Integer accountId);

	public abstract Holding updateHolding(Holding holding);

	public abstract void saveHolding(Holding holding);

	public abstract Order findOrder(Integer id, Integer accountId);

	public abstract Order saveOrder(Order order);

	public abstract Order updateOrder(Order order);

	public abstract List<Order> findOrdersByStatus(Integer accountId, String status);

	public abstract List<Order> findOrders(Integer accountId);

	public abstract List<Holding> findHoldingsByAccountId(Integer accountId, Integer page, Integer pageSize);

	public abstract Quote findQuoteBySymbol(String symbol);

	public abstract List<Quote> findQuotesBySymbols(Set<String> symbols);

	public abstract Account findAccount(Integer accountId);

	public abstract PortfolioSummary findPortfolioSummary(Integer accountId);
	
	public abstract MarketSummary findMarketSummary();

	public abstract Accountprofile findByAuthtoken(String token);
	
	public abstract HoldingSummary findHoldingSummary(Integer accountId);
}