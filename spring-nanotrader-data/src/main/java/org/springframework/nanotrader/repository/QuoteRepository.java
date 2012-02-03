package org.springframework.nanotrader.repository;

import org.springframework.nanotrader.domain.Quote;
import org.springframework.roo.addon.layers.repository.jpa.RooJpaRepository;

@RooJpaRepository(domainType = Quote.class)
public interface QuoteRepository {
}
