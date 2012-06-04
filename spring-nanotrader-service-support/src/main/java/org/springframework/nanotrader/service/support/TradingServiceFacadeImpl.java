/*
* Copyright 2002-2012 the original author or authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.springframework.nanotrader.service.support;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.nanotrader.data.service.TradingService;
import org.springframework.nanotrader.service.domain.Account;
import org.springframework.nanotrader.service.domain.Accountprofile;
import org.springframework.nanotrader.service.domain.CollectionResult;
import org.springframework.nanotrader.service.domain.Holding;
import org.springframework.nanotrader.service.domain.HoldingSummary;
import org.springframework.nanotrader.service.domain.MarketSummary;
import org.springframework.nanotrader.service.domain.Order;
import org.springframework.nanotrader.service.domain.PortfolioSummary;
import org.springframework.nanotrader.service.domain.Quote;
import org.springframework.nanotrader.service.support.exception.AuthenticationException;
import org.springframework.nanotrader.service.support.exception.NoRecordsFoundException;
import org.springframework.stereotype.Service;

/**
* Facade that, generally, delegates directly to a {@link TradingService},
* after mapping from service domain to data domain. For {@link #saveOrder(Order, boolean)},
* and option for synch/asynch processing is provided.
* @author Gary Russell
* @author Brian Dussault
* @author Kashyap Parikh
*/
@Service
public class TradingServiceFacadeImpl implements TradingServiceFacade {

    private static Logger log = LoggerFactory.getLogger(TradingServiceFacadeImpl.class);

    private String ORDER_MAPPING = "order";

    private static String HOLDING_MAPPING = "holding";

    private static String QUOTE_MAPPING = "quote";
    
    private static final String ACCOUNT_PROFILE_MAPPING = "accountProfile";
    
    private static final String ACCOUNT_MAPPING = "account";

    private static final String PORTFOLIO_SUMMARY_MAPPING = "portfolioSummary";
    
    private static final String MARKET_SUMMARY_MAPPING = "marketSummary";
    
    private static final String HOLDING_SUMMARY_MAPPING = "holdingSummary";
    
    private static Integer DEFAULT_PAGE = 0;
    
    private static Integer DEFAULT_PAGE_SIZE = 24;
    
    @Resource
    private TradingService tradingService;

    @Resource
    private Mapper mapper;

    @Autowired(required=false)
    private OrderGateway orderGateway;

    @Cacheable(value="authorizationCache")
    public Accountprofile findAccountprofileByAuthtoken(String token) { 
        if (token == null) { 
            log.error("TradingServiceFacadeImpl.findAccountprofileByAuthtoken(): token is null");
        }
        Accountprofile accountProfileResponse = null;
        org.springframework.nanotrader.data.domain.Accountprofile accountProfile = new org.springframework.nanotrader.data.domain.Accountprofile();
        accountProfile = tradingService.findByAuthtoken(token);
        if (accountProfile != null) { 
            accountProfileResponse = new Accountprofile();
            mapper.map(accountProfile, accountProfileResponse, ACCOUNT_PROFILE_MAPPING);
        } else { 
            log.error("TradingServiceFacadeImpl.findAccountprofileByAuthtoken(): accountProfile is null for token=" + token);
            throw new AuthenticationException("Authorization Token not found");
        }
        
        return accountProfileResponse;
    }
    
    public Accountprofile findAccountprofileByUserId(String username) { 
        org.springframework.nanotrader.data.domain.Accountprofile accountProfile = new org.springframework.nanotrader.data.domain.Accountprofile();
        accountProfile = tradingService.findAccountByUserId(username);
        Accountprofile accountProfileResponse = new Accountprofile();
        mapper.map(accountProfile, accountProfileResponse, "accountProfile-no-accounts");
        return accountProfileResponse;
    }
    
    
    public Map<String, Object> login(String username, String password) { 
        
        org.springframework.nanotrader.data.domain.Accountprofile accountProfile  = tradingService.login(username, password);
        Map<String, Object> loginResponse = null;
        
        if (accountProfile != null) { 
            loginResponse = new HashMap<String, Object>();
            Set<org.springframework.nanotrader.data.domain.Account> accounts = accountProfile.getAccounts();
            loginResponse.put("authToken", accountProfile.getAuthtoken());
            loginResponse.put("profileid", accountProfile.getProfileid());
            for (org.springframework.nanotrader.data.domain.Account account: accounts) { 
                loginResponse.put("accountid", account.getAccountid());
            }
        } else {
            log.error("TradingServiceFacade.login failed to find username=" + username + " password" + password);
            throw new AuthenticationException("Login failed for user: " + username);
        }
        
        if (log.isDebugEnabled()) { 
            log.error("TradingServiceFacade.login success for " + username + " username::token=" + loginResponse.get("authToken"));
        }
        return loginResponse;
        
    }
    

    public void setTradingService(TradingService tradingService) {
        this.tradingService = tradingService;
    }

    @CacheEvict(value="authorizationCache")
    public void logout(String authtoken) {
        
        if (log.isDebugEnabled()) { 
            log.error("TradingServiceFacade.logout: username::token=" + authtoken);
        }
        tradingService.logout(authtoken);
    }
    
    public Accountprofile findAccountProfile(Integer id) {
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findAccountProfile: id=" + id);
        }
        org.springframework.nanotrader.data.domain.Accountprofile accountProfile = tradingService.findAccountProfile(id);
        Accountprofile accountProfileResponse = new Accountprofile();
        if (accountProfile == null) {
            throw new NoRecordsFoundException();
        }

        mapper.map(accountProfile, accountProfileResponse, "accountProfile");
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.find - after service call. Payload is: "
                    + accountProfileResponse);
        }

        return accountProfileResponse;
    }

    public Integer saveAccountProfile(Accountprofile accountProfileRequest) {
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.saveAccountProfile:"
                    + accountProfileRequest.toString());
        }
        
        org.springframework.nanotrader.data.domain.Accountprofile accountProfile = new org.springframework.nanotrader.data.domain.Accountprofile();
        mapper.map(accountProfileRequest, accountProfile);
        org.springframework.nanotrader.data.domain.Accountprofile createdAccountProfile = tradingService.saveAccountProfile(accountProfile);
        return createdAccountProfile.getProfileid();
    }

    
    public void updateAccountProfile(Accountprofile accountProfileRequest, String username) {
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.updateAccountProfile:"
                    + accountProfileRequest.toString());
        }
        accountProfileRequest.setAccounts(null); //dont expect this to be populated by the client
        org.springframework.nanotrader.data.domain.Accountprofile accountProfile = new org.springframework.nanotrader.data.domain.Accountprofile();
        mapper.map(accountProfileRequest, accountProfile);
        tradingService.updateAccountProfile(accountProfile, username);
    }

    public Holding findHolding(Integer id, Integer accountId) {
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findHolding: id=" + id);
        }
        Holding holdingResponse = new Holding();
        org.springframework.nanotrader.data.domain.Holding holding = tradingService.findHolding(id, accountId);
        if (holding == null) {
            throw new NoRecordsFoundException();
        }
        Set<String> symbol = new HashSet<String>();
        symbol.add(holding.getQuoteSymbol());
        Map<String, Quote> currentQuote = getCurrentQuotes(symbol);
        mapper.map(holding, holdingResponse);
        holdingResponse.setQuote(currentQuote.get(holding.getQuoteSymbol()));
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findHolding - after service call. Payload is: " + holdingResponse);
        }
        return holdingResponse;
    }
    
    
    public CollectionResult findHoldingsByAccountId(Integer accountId, Integer page, Integer pageSize) {
        CollectionResult  collectionResults = new CollectionResult();
        
        
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findHoldingsByAccount: id=" + accountId);
        }
        
        
        List<Holding> holdingResponse = new ArrayList<Holding>();
        collectionResults.setTotalRecords(tradingService.findCountOfHoldingsByAccountId(accountId));
        List<org.springframework.nanotrader.data.domain.Holding> holdings = tradingService.findHoldingsByAccountId(accountId, getPage(page), getPageSize(pageSize));
    
        if (holdings != null  &&  holdings.size() > 0) {          
            Set<String> symbols = new HashSet<String>();
            for (org.springframework.nanotrader.data.domain.Holding h: holdings) { 
                //get unique quotes symbols
                symbols.add(h.getQuoteSymbol());
            }
            
            Map<String, Quote> currentQuotes = getCurrentQuotes(symbols);
            for(org.springframework.nanotrader.data.domain.Holding h: holdings) {
                Holding holding = new Holding();
                mapper.map(h, holding, HOLDING_MAPPING);
                holding.setQuote(currentQuotes.get(h.getQuoteSymbol()));
                holdingResponse.add(holding);
            }
        }
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findHoldingsByAccountId completed");
        }
        collectionResults.setPage(getPage(page));
        collectionResults.setPageSize(getPageSize(pageSize));
        collectionResults.setResults(holdingResponse);
      
        
      
        return collectionResults;
    }
    
    
    public Integer saveOrder(Order orderRequest, boolean synch) {
        if (synch) {
            return saveOrderDirect(orderRequest);
        }
        else {
            orderGateway.sendOrder(orderRequest);
            return null;
        }
    }

    public Integer saveOrderDirect(Order orderRequest) {
        org.springframework.nanotrader.data.domain.Order order = new org.springframework.nanotrader.data.domain.Order();
        mapper.map(orderRequest, order, ORDER_MAPPING);
        tradingService.saveOrder(order);
        return order.getOrderid();
    }

    

    public Order findOrder(Integer orderId, Integer accountId) {
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findOrder: orderId=" + orderId + " accountId=" + accountId);
        }
        org.springframework.nanotrader.data.domain.Order order =  tradingService.findOrder(orderId, accountId);
        if (order == null) {
            throw new NoRecordsFoundException();
        }
        Order responseOrder = new Order();
        mapper.map(order, responseOrder, ORDER_MAPPING);
        return responseOrder;
    }

    public void updateOrder(Order orderRequest) {
        if (log.isDebugEnabled()) {
            log.debug("OrderController.update:" + orderRequest.toString());
        }
        org.springframework.nanotrader.data.domain.Order order = new org.springframework.nanotrader.data.domain.Order();
        mapper.map(orderRequest, order, ORDER_MAPPING);
        tradingService.updateOrder(order);
    }

    public CollectionResult findOrders(Integer accountId, String status, Integer page, Integer pageSize) {
    	CollectionResult  collectionResults = new CollectionResult();
        if (log.isDebugEnabled()) {
            log.debug("OrderController.findOrders: accountId=" + accountId + " status" + status);
        }
        List<org.springframework.nanotrader.data.domain.Order> orders = null;
        
        collectionResults.setTotalRecords(tradingService.findCountOfOrders(accountId, status));
        if (status != null) {
            orders = tradingService.findOrdersByStatus(accountId, status, getPage(page), getPageSize(pageSize)); //get by status
        } else {
            orders = tradingService.findOrders(accountId, getPage(page), getPageSize(pageSize)); //get all orders
        }
        
       
        List<Order> responseOrders = new ArrayList<Order>();
        if (orders != null && orders.size() > 0 ) {
            
        
            for(org.springframework.nanotrader.data.domain.Order o: orders) {
                Order order = new Order();
                mapper.map(o, order, ORDER_MAPPING);
                responseOrders.add(order);
            }
        }
        
        collectionResults.setPage(getPage(page));
        collectionResults.setPageSize(getPageSize(pageSize));
        collectionResults.setResults(responseOrders);
        
        return collectionResults;
    }
    
    public CollectionResult findQuotes() {
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade: findQuotes");
        }
        CollectionResult  collectionResults = new CollectionResult();
        List<org.springframework.nanotrader.data.domain.Quote> quotes = null;
        Long totalRecords = new Long(tradingService.findAllQuotes().size());
        collectionResults.setTotalRecords(totalRecords);
        quotes = tradingService.findAllQuotes(); //get all quotes
        List<Quote> responseQuotes = new ArrayList<Quote>();
        if (quotes != null && quotes.size() > 0 ) {
            for(org.springframework.nanotrader.data.domain.Quote o: quotes) {
                Quote quote = new Quote();
                mapper.map(o, quote, QUOTE_MAPPING);
                responseQuotes.add(quote);
            }
        }
        collectionResults.setResults(responseQuotes);
        return collectionResults;
    }

    public Account findAccount(Integer id) {
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findAccount: id=" + id);
        }
        
        Account accountResponse = new Account();
        org.springframework.nanotrader.data.domain.Account account = tradingService.findAccount(id);
        if (account == null) {
            throw new NoRecordsFoundException();
        }
        
        mapper.map(account, accountResponse, ACCOUNT_MAPPING);
        
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findAccount - after service call. Payload is: " + accountResponse);
        }
        return accountResponse;
    }
    

    

    private Map<String, Quote> getCurrentQuotes(Set<String> symbols) { 
        List<org.springframework.nanotrader.data.domain.Quote> quotes = tradingService.findQuotesBySymbols(symbols);
        Map<String, Quote> currentQuotes = new HashMap<String, Quote>();
        for (org.springframework.nanotrader.data.domain.Quote q: quotes) {
            Quote quote = new Quote();
            mapper.map(q, quote);
            currentQuotes.put(q.getSymbol(), quote);
        }
        return currentQuotes;
    }
    
    public Quote findQuoteBySymbol(String symbol) {
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findQuote: quoteId=" + symbol);
        }
        org.springframework.nanotrader.data.domain.Quote quote = tradingService.findQuoteBySymbol(symbol);
        if (quote == null) {
            throw new NoRecordsFoundException();
        }
        Quote responseQuote = new Quote();
        mapper.map(quote, responseQuote, QUOTE_MAPPING);
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findQuote: completed successfully.");
        }
        return responseQuote;
    }

    public PortfolioSummary findPortfolioSummary(Integer accountId) { 
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findPortfolioSummary: accountId=" + accountId);
        }
        org.springframework.nanotrader.data.domain.PortfolioSummary portfolioSummary = tradingService.findPortfolioSummary(accountId);
        PortfolioSummary portfolioSummaryResponse = new PortfolioSummary();
        mapper.map(portfolioSummary, portfolioSummaryResponse, PORTFOLIO_SUMMARY_MAPPING);
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findPortfolioSummary: completed successfully.");
        }
        return portfolioSummaryResponse;
    }
    
    public MarketSummary findMarketSummary() { 
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findMarketSummary: Start");
        }
        org.springframework.nanotrader.data.domain.MarketSummary marketSummary = tradingService.findMarketSummary();
        MarketSummary marketSummaryResponse = new MarketSummary();
        mapper.map(marketSummary, marketSummaryResponse, MARKET_SUMMARY_MAPPING);
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findMarketSummary: completed successfully.");
        }
        return marketSummaryResponse;
    }
    
    public HoldingSummary findHoldingSummary(Integer accountId) {
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findHoldingSummary: Start accountId=" + accountId );
        }
        org.springframework.nanotrader.data.domain.HoldingSummary holdingSummary = tradingService.findHoldingSummary(accountId);
        HoldingSummary holdingSummaryResponse = new HoldingSummary();
        mapper.map(holdingSummary, holdingSummaryResponse, HOLDING_SUMMARY_MAPPING);
        if (log.isDebugEnabled()) {
            log.debug("TradingServiceFacade.findHoldingSummary: completed successfully.");
        }
        return holdingSummaryResponse;
    }
    
    private Integer getPageSize(Integer pageSize) { 
        if (pageSize == null) { 
            return DEFAULT_PAGE_SIZE;
        }
        return pageSize;
    }
    
    private Integer getPage(Integer page) { 
        if (page == null) { 
            return DEFAULT_PAGE;
        }
        return page;
    }
    
    
    public static interface OrderGateway {

        void sendOrder(Order order);
    }



}