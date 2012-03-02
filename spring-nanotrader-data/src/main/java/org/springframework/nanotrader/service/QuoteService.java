package org.springframework.nanotrader.service;

import java.util.List;
import org.springframework.nanotrader.domain.Quote;

public interface QuoteService {

	public abstract long countAllQuotes();


	public abstract void deleteQuote(Quote quote);

	public abstract Quote findQuote(Integer id);


	public abstract List<Quote> findAllQuotes();


	public abstract List<Quote> findQuoteEntries(int firstResult, int maxResults);


	public abstract void saveQuote(Quote quote);


	public abstract Quote updateQuote(Quote quote);

}
