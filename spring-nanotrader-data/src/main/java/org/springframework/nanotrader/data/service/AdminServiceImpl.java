/**
 * 
 */
package org.springframework.nanotrader.data.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.nanotrader.data.domain.Account;
import org.springframework.nanotrader.data.domain.Accountprofile;
import org.springframework.nanotrader.data.domain.Holding;
import org.springframework.nanotrader.data.domain.Order;
import org.springframework.nanotrader.data.domain.Quote;
import org.springframework.nanotrader.data.repository.AccountProfileRepository;
import org.springframework.nanotrader.data.repository.HoldingRepository;
import org.springframework.nanotrader.data.repository.QuoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	private static Logger log = LoggerFactory.getLogger(AdminServiceImpl.class);

	@Autowired
	private AccountProfileRepository accountProfileRepository;

	@Autowired
	private HoldingRepository holdingRepository;

	@Autowired
	private QuoteRepository quoteRepository;

	@Autowired
	private TradingService tradingService;

	@Override
	public void recreateData(int count) {
		List<Quote> quotes = quoteRepository.findAll();
		for (int i = 1; i <= count; i++) {
			String userid = "user" + i;	
			BigDecimal balance = new BigDecimal("1000000.00");
			Account ac = new Account();
			ac.setBalance(balance);
			Date creationdate = new Date();
			ac.setCreationdate(creationdate);
			ac.setLastlogin(creationdate);
			ac.setLogincount(0);
			ac.setLogoutcount(0);
			ac.setOpenbalance(balance);
			Accountprofile ap = new Accountprofile();
			ap.setUserid(userid);
			// Password is same as that of the userid
			ap.setPasswd(userid);
			ap.setAddress(userid + " address");
			ap.setEmail(userid + "@nanotrader.com");
			ap.setFullname("first_" + userid + " " + "last " + userid);
			ap.setCreditcard("1111222233334444");
			Set<Account> accounts = new HashSet<Account>();
			accounts.add(ac);
			ap.setAccounts(accounts);
			tradingService.saveAccountProfile(ap);
			Order o = new Order();
			o.setAccountAccountid(accountProfileRepository.findByUserid(userid).getAccounts().iterator().next());
			o.setCompletiondate(creationdate);
			o.setQuantity(new BigDecimal(1000));
			o.setOrdertype("buy");
			o.setQuote(quotes.get(0));
			tradingService.saveOrder(o);
			o.setQuote(quotes.get(1));
			tradingService.saveOrder(o);
			o.setQuote(quotes.get(2));
			tradingService.saveOrder(o);
			o.setQuote(quotes.get(3));
			tradingService.saveOrder(o);
			o.setQuote(quotes.get(4));
			tradingService.saveOrder(o);
			o.setQuote(quotes.get(5));
			tradingService.saveOrder(o);
			List<Holding> holdings = holdingRepository.findByAccountAccountid(ac.getAccountid(), new PageRequest(0, 3));
			sellStock(ac, holdings.get(0));
			sellStock(ac, holdings.get(1));
			sellStock(ac, holdings.get(2));
		}
	}


	private void sellStock(Account ac, Holding holding) {
		Date completionDate = new Date();
		Order o = new Order();
		o.setAccountAccountid(ac);
		o.setCompletiondate(completionDate);
		o.setQuantity(new BigDecimal(1000));
		o.setOrdertype("sell");
		o.setHoldingHoldingid(holding);
		o.setQuote(quoteRepository.findBySymbol(holding.getQuoteSymbol()));
		tradingService.saveOrder(o);
	}

}
