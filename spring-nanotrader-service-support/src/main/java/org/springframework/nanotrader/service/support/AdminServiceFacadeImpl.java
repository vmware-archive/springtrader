/**
 * 
 */
package org.springframework.nanotrader.service.support;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.nanotrader.data.domain.Account;
import org.springframework.nanotrader.data.domain.Accountprofile;
import org.springframework.nanotrader.data.repository.AccountProfileRepository;
import org.springframework.nanotrader.data.repository.AccountRepository;
import org.springframework.nanotrader.data.repository.HoldingRepository;
import org.springframework.nanotrader.data.repository.QuoteRepository;
import org.springframework.nanotrader.data.service.TradingService;
import org.springframework.nanotrader.service.domain.Order;
import org.springframework.nanotrader.service.domain.Quote;
import org.springframework.stereotype.Service;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
@Service
public class AdminServiceFacadeImpl implements AdminServiceFacade {

	private static Logger log = LoggerFactory.getLogger(AdminServiceFacadeImpl.class);

	@Resource
	private TradingService tradingService;

	@Resource
	private TradingServiceFacade tradingServiceFacade;

	@Autowired
	private AccountProfileRepository accountProfileRepository;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private QuoteRepository quoteRepository;

	@Resource
	private Mapper mapper;

	@Override
	public void recreateData(int count) {
		List<org.springframework.nanotrader.data.domain.Quote> quotesrepo = quoteRepository.findAll();
		ArrayList<Quote> quotes = new ArrayList<Quote>();
		for (org.springframework.nanotrader.data.domain.Quote q : quotesrepo) {
			Quote quote = new Quote();
			mapper.map(q, quote);
			quotes.add(quote);
		}
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
			o.setAccountid(accountRepository.findByProfileProfileid(accountProfileRepository.findByUserid(userid))
					.getAccountid());
			o.setCompletiondate(creationdate);
			o.setQuantity(new BigDecimal(1000));
			o.setOrdertype("buy");
			o.setQuote(quotes.get(0));
			tradingServiceFacade.saveOrder(o, false);
			o.setQuote(quotes.get(1));
			tradingServiceFacade.saveOrder(o, false);
			o.setQuote(quotes.get(2));
			tradingServiceFacade.saveOrder(o, false);
			o.setQuote(quotes.get(3));
			tradingServiceFacade.saveOrder(o, false);
			o.setQuote(quotes.get(4));
			tradingServiceFacade.saveOrder(o, false);
		}
	}

}
