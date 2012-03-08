package org.springframework.nanotrader.service;

import java.util.List;
import java.util.Set;

import org.springframework.nanotrader.domain.Account;
import org.springframework.nanotrader.domain.Accountprofile;
import org.springframework.nanotrader.domain.Holding;
import org.springframework.nanotrader.domain.Order;
import org.springframework.nanotrader.domain.Quote;


public interface TradingService {

	public static final String ORDER_TYPE_BUY = "buy";

	public static final String ORDER_TYPE_SELL = "sell";

	public abstract Accountprofile findAccountProfile(Integer id);

	public abstract Accountprofile saveAccountProfile(Accountprofile accountProfile);

	public abstract Accountprofile updateAccountProfile(Accountprofile accountProfile);

	public abstract Holding findHolding(Integer id);

	public abstract Holding updateHolding(Holding holding);

	public abstract void saveHolding(Holding holding);

	public abstract Order findOrder(Integer id);

	public abstract Order saveOrder(Order order);

	public abstract Order updateOrder(Order order);

	public abstract List<Order> findOrdersByStatus(Integer accountId, String status);

	public abstract List<Order> findOrders(Integer accountId);

	public abstract List<Holding> findHoldingsByAccountId(Integer accountId, Integer page, Integer pageSize);

	public abstract Quote findQuoteBySymbol(String symbol);

	public List<Quote> findQuotesBySymbols(Set<String> symbols);

	public Account findAccount(Integer accountId);


}