package org.springframework.nanotrader.data.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.nanotrader.data.domain.Quote;
import org.springframework.nanotrader.data.repository.QuoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class QuoteServiceImpl implements QuoteService {

	@Autowired
    QuoteRepository quoteRepository;

	
	public long countAllQuotes() {
        return quoteRepository.count();
    }

	public void deleteQuote(Quote quote) {
        quoteRepository.delete(quote);
    }

	public Quote findQuote(Integer id) {
        return quoteRepository.findOne(id);
    }

	public List<Quote> findAllQuotes() {
        return quoteRepository.findAll();
    }

	public List<Quote> findQuoteEntries(int firstResult, int maxResults) {
        return quoteRepository.findAll(new org.springframework.data.domain.PageRequest(firstResult / maxResults, maxResults)).getContent();
    }

	public void saveQuote(Quote quote) {
        quoteRepository.save(quote);
    }

	public Quote updateQuote(Quote quote) {
        return quoteRepository.save(quote);
    }
}
