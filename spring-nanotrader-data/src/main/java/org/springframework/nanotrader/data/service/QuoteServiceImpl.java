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
