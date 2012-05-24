package org.springframework.nanotrader.data.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.dao.IncorrectUpdateSemanticsDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.nanotrader.data.domain.Account;
import org.springframework.nanotrader.data.domain.Accountprofile;
import org.springframework.nanotrader.data.domain.Holding;
import org.springframework.nanotrader.data.domain.HoldingSummary;
import org.springframework.nanotrader.data.domain.MarketSummary;
import org.springframework.nanotrader.data.domain.Order;
import org.springframework.nanotrader.data.domain.PortfolioSummary;
import org.springframework.nanotrader.data.domain.Quote;
import org.springframework.nanotrader.data.repository.AccountProfileRepository;
import org.springframework.nanotrader.data.repository.AccountRepository;
import org.springframework.nanotrader.data.repository.HoldingAggregateRepository;
import org.springframework.nanotrader.data.repository.HoldingRepository;
import org.springframework.nanotrader.data.repository.MarketSummaryRepository;
import org.springframework.nanotrader.data.repository.OrderRepository;
import org.springframework.nanotrader.data.repository.PortfolioSummaryRepository;
import org.springframework.nanotrader.data.repository.QuoteRepository;
import org.springframework.nanotrader.data.util.FinancialUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TradingServiceImpl implements TradingService {

	private static Logger log = LoggerFactory.getLogger(TradingServiceImpl.class);

	public static BigDecimal DEFAULT_ORDER_FEE = BigDecimal.valueOf(1050, 2);

	private static String OPEN_STATUS = "open";

	private static String CANCELLED_STATUS = "cancelled";

	private static Integer TOP_N = 3;

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

	@Autowired
	private PortfolioSummaryRepository portfolioSummaryRepository;

	@Autowired
	private MarketSummaryRepository marketSummaryRepository;

	@Autowired
	private HoldingAggregateRepository holdingAggregateRepository;

	@Autowired
	QuotePublisher quotePublisher;

	@Override
	public Accountprofile login(String username, String password) {
		Accountprofile accountProfile = accountProfileRepository.findByUseridAndPasswd(username, password);
		if (accountProfile != null) {
			accountProfile.setAuthtoken(UUID.randomUUID().toString());
			accountProfile = accountProfileRepository.save(accountProfile); // persist new auth token
			Set<Account> accounts = accountProfile.getAccounts();
			for (Account account : accounts) {
				account.setLogincount(account.getLogincount() + 1);
				account.setLastlogin(new Date());
				accountRepository.save(account);
			}
			return accountProfile;
		}
		return null;
	}

	@Override
	public void logout(String authtoken) {
		Accountprofile accountProfile = accountProfileRepository.findByAuthtoken(authtoken);
		if (accountProfile != null) {
	 		accountProfile.setAuthtoken(null); // remove token
			accountProfileRepository.save(accountProfile);
			Set<Account> accounts = accountProfile.getAccounts();
			for (Account account : accounts) {
				account.setLogoutcount(account.getLogoutcount() + 1);
				accountRepository.save(account);
			}			
		}
	}

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
	public Accountprofile saveAccountProfile(Accountprofile accountProfile) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.saveAccountProfile: accountProfile=" + accountProfile.toString());
		}
		Account account = accountProfile.getAccounts().iterator().next();
		account.setProfileProfileid(accountProfile);
		account.setLogincount(0);
		account.setLogoutcount(0);
		account.setBalance(account.getOpenbalance());
		account.setCreationdate(new Date());
		Accountprofile createdAccountProfile = accountProfileRepository.save(accountProfile);
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.saveAccountProfile: accountProfile saved.");
		}
		accountRepository.save(account);
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.saveAccountProfile: completed successfully.");
		}
		return createdAccountProfile;
	}

	@Override
	public Accountprofile updateAccountProfile(Accountprofile accountProfile, String username) {
		Accountprofile accountProfileResponse = null;
		Accountprofile acctProfile = accountProfileRepository.findByUserid(username);
		// make sure that the primary key hasn't been altered
		if (acctProfile != null) {
			accountProfile.setAuthtoken(acctProfile.getAuthtoken());
			accountProfileResponse = accountProfileRepository.save(accountProfile);
		}
		return accountProfileResponse;
	}

	@Override
	public Long findCountOfHoldingsByAccountId(Integer accountId) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findHoldingsByAccountId: accountId=" + accountId);
		}
		Long countOfHoldings = holdingRepository.findCountOfHoldings(accountId);
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findHoldingsByAccountId: completed successfully.");
		}
		return countOfHoldings;
	}

	@Override
	public List<Holding> findHoldingsByAccountId(Integer accountId, Integer page, Integer pageSize) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findHoldingsByAccountId: accountId=" + accountId);
		}
		List<Holding> holdings = holdingRepository.findByAccountAccountid(accountId, new PageRequest(page, pageSize));
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findHoldingsByAccountId: completed successfully.");
		}
		return holdings;
	}

	@Override
	public Holding findHolding(Integer id, Integer accountId) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findHolding: holdingId=" + id + " accountid=" + accountId);
		}
		Holding holding = holdingRepository.findByHoldingidAndAccountAccountid(id, accountId);
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
	public Order findOrder(Integer id, Integer accountId) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findOrder: orderId=" + id);
		}
		Order order = orderRepository.findByOrderidAndAccountAccountid(id, accountId);
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findOrder: completed successfully.");
		}
		return order;
	}

	@Override
	@Transactional
	public Order saveOrder(Order order) {
		Order createdOrder = null;
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.saveOrder: order=" + order.toString());
		}
		if (ORDER_TYPE_BUY.equals(order.getOrdertype())) {
			createdOrder = buy(order);
		}
		else if (ORDER_TYPE_SELL.equals(order.getOrdertype())) {
			createdOrder = sell(order);
		}
		else {
			throw new UnsupportedOperationException(
					"Order type was not recognized. Valid order types are 'buy' or 'sell'");
		}
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.saveOrder: completed successfully.");
		}
		return createdOrder;
	}

	private Order buy(Order order) {
		Account account = accountRepository.findOne(order.getAccountAccountid().getAccountid());
		Quote quote = quoteRepository.findBySymbol(order.getQuote().getSymbol());
		Holding holding = null;
		// create order and persist
		Order createdOrder = null;

		if ((order.getQuantity() != null && order.getQuantity().intValue() > 0)
				&& (account.getBalance().subtract(order.getQuantity().multiply(quote.getPrice())).doubleValue() >= 0)) { // cannot
																															// buy
			createdOrder = createOrder(order, account, holding, quote);
			// Update account balance and create holding
			completeOrder(createdOrder);
		}
		else {
			order.setQuantity(new BigDecimal(0));
			createdOrder = createOrder(order, account, holding, quote);
			// cancel order
			createdOrder.setCompletiondate(new Date());
			createdOrder.setOrderstatus(CANCELLED_STATUS);
		}

		return createdOrder;
	}

	private Order sell(Order order) {
		Account account = accountRepository.findOne(order.getAccountAccountid().getAccountid());
		Holding holding = holdingRepository.findByHoldingidAndAccountAccountid(order.getHoldingHoldingid()
				.getHoldingid(), account.getAccountid());
		if (holding == null) {
			throw new DataRetrievalFailureException("Attempted to sell holding"
					+ order.getHoldingHoldingid().getHoldingid() + " which is already sold.");
		}
		Quote quote = quoteRepository.findBySymbol(holding.getQuoteSymbol());
		// create order and persist
		Order createdOrder = createOrder(order, account, holding, quote);
		// Update account balance and create holding
		completeOrder(createdOrder);
		return createdOrder;
	}

	private Order createOrder(Order order, Account account, Holding holding, Quote quote) {
		Order createdOrder = null;
		order.setAccountAccountid(account);
		order.setQuote(quote);
		if (order.getQuantity() == null) {
			order.setQuantity(holding.getQuantity());
		}
		order.setOrderfee(DEFAULT_ORDER_FEE);
		order.setOrderstatus(OPEN_STATUS);
		order.setOpendate(new Date());
		order.setPrice(quote.getPrice().setScale(FinancialUtils.SCALE, FinancialUtils.ROUND));
		order.setHoldingHoldingid(holding);
		createdOrder = orderRepository.save(order);
		return createdOrder;
	}

	// TO DO: refactor this
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
				updateAccount(order);
			}
		}
		else {
			updateAccount(order);
		}
		order.setOrderstatus("closed");
		order.setCompletiondate(new Date());
		updateQuoteMarketData(order.getQuote().getSymbol(), FinancialUtils.getRandomPriceChangeFactor(),
				order.getQuantity());
		return order;
	}

	// TODO: Need to clean this up
	private void updateAccount(Order order) {
		// update account balance
		Quote quote = order.getQuote();
		Account account = order.getAccountAccountid();
		BigDecimal price = quote.getPrice();
		BigDecimal orderFee = order.getOrderfee();
		BigDecimal balance = account.getBalance();
		BigDecimal total = null;
		if (ORDER_TYPE_BUY.equals(order.getOrdertype())) {
			total = (order.getQuantity().multiply(price)).add(orderFee);
			account.setBalance(balance.subtract(total));
		}
		else {
			total = (order.getQuantity().multiply(price)).subtract(orderFee);
			account.setBalance(balance.add(total));
			Set<Order> orders = order.getHoldingHoldingid().getOrders();
			// Remove the holding id from the buy record
			for (Order orderToDeleteHolding : orders) {
				orderToDeleteHolding.setHoldingHoldingid(null);
			}
			// remove the holding id from the sell record
			Integer holdingId = order.getHoldingHoldingid().getHoldingid();
			order.setHoldingHoldingid(null);
			holdingRepository.delete(holdingId);
		}
		accountRepository.save(account);
	}

	private void updateQuoteMarketData(String symbol, BigDecimal changeFactor, BigDecimal sharesTraded) {
		Quote quote = quoteRepository.findBySymbol(symbol);

		BigDecimal oldPrice = quote.getPrice();
		if (quote.getPrice().equals(FinancialUtils.PENNY_STOCK_PRICE)) {
			changeFactor = FinancialUtils.PENNY_STOCK_RECOVERY_MIRACLE_MULTIPLIER;
		}

		BigDecimal newPrice = changeFactor.multiply(oldPrice).setScale(2, BigDecimal.ROUND_HALF_UP);
		quote.setPrice(newPrice);
		quote.setVolume(quote.getVolume().add(sharesTraded));
		quote.setChange1(newPrice.subtract(quote.getOpen1()));
		quoteRepository.save(quote);
		this.quotePublisher.publishQuote(quote);
	}

	@Override
	public Order updateOrder(Order order) {
		Order o = null;
		if (log.isDebugEnabled()) {
			if (order != null ) { 
				log.debug("TradingServices.updateOrder: order=" + order.toString());
			} else { 
				log.debug("TradingServices.updateOrder: order= null" );
			}
			
		}
		// Ensure that customers can't update another customers order record
		Order originalOrder = orderRepository.findByOrderidAndAccountAccountid(order.getOrderid(), order.getAccountAccountid().getAccountid());

		if (originalOrder!= null && !"completed".equals(originalOrder.getOrderstatus())) {
			if (originalOrder != null) {
				if (log.isDebugEnabled()) {
					log.debug("TradingServices.updateOrder: An order in the respository matched the requested order id and account ");
				}
				originalOrder.setQuantity(order.getQuantity());
				originalOrder.setOrdertype(order.getOrdertype());
				o = orderRepository.save(originalOrder);

			}
		}
		else {
			throw new IncorrectUpdateSemanticsDataAccessException("Attempted to update a completed order");
		}

		if (log.isDebugEnabled()) {
			log.debug("TradingServices.updateOrder: completed successfully.");
		}
		return o;
	}

	@Override
	public Long findCountOfOrders(Integer accountId, String status) {
		Long countOfOrders = null;
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findCountOfHoldings: accountId=" + accountId + " status=" + status);
		}
		if (status != null) {
			countOfOrders = orderRepository.findCountOfOrders(accountId, status);
		}
		else {
			countOfOrders = orderRepository.findCountOfOrders(accountId);
		}

		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findCountOfHoldings: completed successfully.");
		}
		return countOfOrders;
	}

	@Override
	public List<Order> findOrdersByStatus(Integer accountId, String status, Integer page, Integer pageSize) {
		List<Order> orders = null;

		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findOrdersByStatus: accountId=" + accountId + " status=" + status);
		}
		
		orders = orderRepository.findOrdersByStatus(accountId, status, new PageRequest(page, pageSize));
		orders = processOrderResults(orders, accountId);
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findOrdersByStatus: completed successfully.");
		}

		return orders;
	}

	@Override
	@Transactional
	public List<Order> findOrders(Integer accountId, Integer page, Integer pageSize) {
		List<Order> orders = null;
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findOrders: accountId=" + accountId);
		}
		orders = orderRepository.findOrdersByAccountAccountid_Accountid(accountId, new PageRequest(page, pageSize));
		orders = processOrderResults(orders, accountId);

		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findOrders: completed successfully.");
		}

		return orders;
	}

	private List<Order> processOrderResults(List<Order> orders, Integer accountId) { 
		if (orders != null && orders.size() > 0) {
			// Loop over the orders to populate the lazy quote fields
			for (Order order : orders) {
				order.getQuote();
			}
			orderRepository.updateClosedOrders(accountId);
		}
		return orders;
	}
	
	@Override
	public Quote findQuoteBySymbol(String symbol) {
		return quoteRepository.findBySymbol(symbol);
	}

	@Override
	public List<Quote> findQuotesBySymbols(Set<String> symbols) {
		return quoteRepository.findBySymbolIn(symbols);
	}

	@Override
	public List<Quote> findRandomQuotes(Integer count) {
		return quoteRepository.findAll().subList(0, count.intValue());
	}

	@Override
	public Account findAccount(Integer accountId) {
		return accountRepository.findOne(accountId);
	}

	@Override
	public Account findAccountByProfile(Accountprofile ap) {
		return accountRepository.findByProfileProfileid(ap);
	}

	@Override
	public PortfolioSummary findPortfolioSummary(Integer accountId) {
		PortfolioSummary portfolioSummary = portfolioSummaryRepository.findPortfolioSummary(accountId);
		return portfolioSummary;
	}

	// TODO: Defensive coding
	public MarketSummary findMarketSummary() {
		MarketSummary marketSummary = marketSummaryRepository.findMarketSummary();
		// get top losing stocks
		Page<Quote> losers = quoteRepository.findAll(new PageRequest(0, TOP_N, new Sort(Direction.ASC, "change1")));

		// get top gaining stocks
		Page<Quote> winners = quoteRepository.findAll(new PageRequest(0, TOP_N, new Sort(Direction.DESC, "change1")));

		List<Quote> topLosers = new ArrayList<Quote>(TOP_N);
		for (Quote q : losers) {
			topLosers.add(q);
		}
		List<Quote> topGainers = new ArrayList<Quote>(TOP_N);
		for (Quote q : winners) {
			topGainers.add(q);
		}
		marketSummary.setTopLosers(topLosers);
		marketSummary.setTopGainers(topGainers);
		marketSummary.setSummaryDate(new Date());
		return marketSummary;
	}

	@Override
	public HoldingSummary findHoldingSummary(Integer accountId) {
		HoldingSummary summary = holdingAggregateRepository.findHoldingAggregated(accountId);
		return summary;
	}

	@Override
	public Accountprofile findAccountByUserId(String id) {
		return accountProfileRepository.findByUserid(id);
	}

	@Override
	public Accountprofile findByAuthtoken(String token) {
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findByAuthtoken: token=" + token);
		}

		Accountprofile accountProfile = accountProfileRepository.findByAuthtoken(token);
		if (accountProfile != null) {
			Set<Account> accounts = accountProfile.getAccounts();
			accounts.iterator();
			if (log.isDebugEnabled()) {
				log.debug("TradingServices.findByAuthtoken: completed");
			}

			return accountProfile;
		}
		if (log.isDebugEnabled()) {
			log.debug("TradingServices.findByAuthtoken: completed - user not found.");
		}
		return null;
	}

	@Override
	public void deleteAll() {
		orderRepository.deleteAll();
		holdingRepository.deleteAll();
		accountRepository.deleteAll();
		accountProfileRepository.deleteAll();
	}

	public static interface QuotePublisher {

		void publishQuote(Quote quote);
	}
}
