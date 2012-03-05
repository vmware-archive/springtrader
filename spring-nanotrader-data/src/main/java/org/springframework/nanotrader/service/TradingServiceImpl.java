package org.springframework.nanotrader.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.nanotrader.domain.Account;
import org.springframework.nanotrader.domain.Accountprofile;
import org.springframework.nanotrader.domain.Holding;
import org.springframework.nanotrader.domain.Order;
import org.springframework.nanotrader.domain.Quote;
import org.springframework.nanotrader.repository.AccountProfileRepository;
import org.springframework.nanotrader.repository.AccountRepository;
import org.springframework.nanotrader.repository.HoldingRepository;
import org.springframework.nanotrader.repository.OrderRepository;
import org.springframework.nanotrader.repository.QuoteRepository;
import org.springframework.nanotrader.util.FinancialUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TradingServiceImpl implements TradingService {

	public static BigDecimal DEFAULT_ORDER_FEE = BigDecimal.valueOf(1050, 2);

	private static Logger log = LoggerFactory.getLogger(TradingServiceImpl.class);

	private static String OPEN_STATUS = "open";

	@Autowired
	private AccountProfileRepository accountProfileRepository;

	@Autowired
	private HoldingRepository holdingRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private QuoteRepository quoteRepository;

	@Override
	public Accountprofile findAccountProfile(Integer id) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findAccountProfile: accountProfileId=" + id);
		}
		Accountprofile accountProfile = accountProfileRepository.findOne(id);
		if (accountProfile != null) {
			accountProfile.getAccounts().iterator(); // fetch accounts

		}
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findAccountProfile: completed successfully.");
		}
		return accountProfile;
	}

	@Override
	public void saveAccountProfile(Accountprofile accountProfile) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.saveAccountProfile: holdingId=" + accountProfile.toString());
		}
		Account account = accountProfile.getAccounts().iterator().next();
		account.setProfileProfileid(accountProfile);
		account.setLogincount(0);
		account.setLogoutcount(0);
		account.setBalance(account.getOpenbalance());
		account.setCreationdate(new Date());
		accountProfileRepository.save(accountProfile);
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.saveAccountProfile: accountProfile saved.");
		}
		accountRepository.save(account);
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.saveAccountProfile: completed successfully.");
		}
	}

	@Override
	public Accountprofile updateAccountProfile(Accountprofile accountProfile) {
		return accountProfileRepository.save(accountProfile);
	}

	@Override
	public List<Holding> findHoldingsByAccountId(Integer accountId) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findHoldingsByAccountId: accountId=" + accountId);
		}
		List<Holding> holdings = holdingRepository.findByAccountAccountid(accountId);
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findHoldingsByAccountId: completed successfully.");
		}
		return holdings;
	}
	
	@Override
	public Holding findHolding(Integer id) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findHolding: holdingId=" + id);
		}
		Holding holding = holdingRepository.findOne(id);
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findHolding: completed successfully.");
		}
		return holding;
	}

	@Override
	public void saveHolding(Holding holding) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.saveHolding: holding=" + holding.toString());
		}
		holdingRepository.save(holding);
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.saveHolding: completed successfully.");
		}
	}

	@Override
	public Holding updateHolding(Holding holding) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.updateHolding: holding=" + holding.toString());
		}
		Holding h = holdingRepository.save(holding);
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.updateHolding:  completed successfully.");
		}

		return h;
	}

	@Override
	public Order findOrder(Integer id) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findOrder: orderId=" + id);
		}
		Order order = orderRepository.findOne(id);
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findOrder: completed successfully.");
		}
		return order;
	}

	@Override
	public Order saveOrder(Order order, boolean isSynch) {
		Order createdOrder = null;
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.saveOrder: order=" + order.toString() + " asynch transaction mode =" + isSynch);
		}
		if (ORDER_TYPE_BUY.equals(order.getOrdertype())) {
			createdOrder = buy(order, isSynch);
		} else if (ORDER_TYPE_SELL.equals(order.getOrdertype())) {
			// TODO
		} else {
			throw new UnsupportedOperationException("Order type was not recognized. Valid order types are 'buy' or 'sell'");
		}
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.saveOrder: completed successfully.");
		}
		return createdOrder;
	}

	private Order buy(Order order, boolean isSynch) {
		if (isSynch == true) {
			Account account = accountRepository.findOne(order.getAccountAccountid().getAccountid());
			Quote quote = quoteRepository.findBySymbol(order.getQuote().getSymbol());
			Holding holding = null;
			// create order and persist
			Order createdOrder = createOrder(order, account, holding, quote);
			// Update account balance and create holding
			completeOrder(createdOrder);
		} else {
			// send order to rabbit to complete processing (create holding). SI flow entry goes here??
		}

		return order;
	}

	private Order createOrder(Order order, Account account, Holding holding, Quote quote) {
		Order createdOrder = null;
		order.setAccountAccountid(account);
		order.setQuote(quote);
		order.setOrderfee(DEFAULT_ORDER_FEE);
		order.setOrderstatus(OPEN_STATUS);
		order.setOpendate(new Date());
		order.setPrice(quote.getPrice().setScale(FinancialUtils.SCALE, FinancialUtils.ROUND));
		order.setHoldingHoldingid(holding);
		createdOrder = orderRepository.save(order);
		return createdOrder;
	}

	public Order completeOrder(Order order) {
		if (ORDER_TYPE_BUY.equals(order.getOrdertype())) {
			if (order.getHoldingHoldingid() == null) {
				Holding holding = new Holding();
				holding.setAccountAccountid(order.getAccountAccountid().getAccountid());
				holding.setPurchasedate(new Date());
				holding.setQuantity(order.getQuantity());
				holding.setPurchaseprice(order.getPrice());
				holding.setQuoteSymbol(order.getQuote().getSymbol());
				Set<Order> orders = new HashSet<Order>();
				orders.add(order);
				holding.setOrders(orders);
				order.setHoldingHoldingid(holding);
				holdingRepository.save(holding);
			}
		}
		order.setOrderstatus("closed");
		order.setCompletiondate(new Date());
		// update account balance
		Quote quote = order.getQuote();
		Account account = order.getAccountAccountid();
		BigDecimal price = quote.getPrice();
		BigDecimal orderFee = order.getOrderfee();
		BigDecimal balance = account.getBalance();
		BigDecimal total = (order.getQuantity().multiply(price)).add(orderFee);
		account.setBalance(balance.subtract(total));
		accountRepository.save(account);
		return order;
	}

	@Override
	public Order updateOrder(Order order) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.updateOrder: order=" + order.toString());
		}
		Order o = orderRepository.save(order);
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.updateOrder: completed successfully.");
		}
		return o;
	}

	@Override
	public List<Order> findOrdersByStatus(Integer accountId, String status) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findOrdersByStatus: accountId=" + accountId + " status=" + status);
		}
		List<Order> orders = null;
		
			orders = orderRepository.findOrders(accountId, status);
			if (orders != null && orders.size() > 0) {
				// Loop over the orders to populate the lazy quote fields
				for (Order order : orders) {
					order.getQuote();
				}
				if ("closed".equals(status)) {
					orderRepository.updateClosedOrders(accountId);
				}
			}
			if (log.isDebugEnabled()) {
				log.debug("TradingServices.findOrdersByStatus: completed successfully.");
			}
	
		return orders;
	}

	
	@Override
	@Transactional
	public List<Order> findOrders(Integer accountId) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findOrders: accountId=" + accountId);
		}
		Account account = accountRepository.findOne(accountId);
		List<Order> orders = new ArrayList<Order>();
	
		if (account != null) {
			orders = new ArrayList<Order>(account.getOrders());
			for (Order order : orders) {
				order.getQuote();
			}
		}
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findOrders: completed successfully.");
		}
		
		return orders;
	}

	@Override
	public Quote findQuoteBySymbol(String symbol) {
		return quoteRepository.findBySymbol(symbol);
	}
	
}
