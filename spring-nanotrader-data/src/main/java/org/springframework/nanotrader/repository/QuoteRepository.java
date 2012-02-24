package org.springframework.nanotrader.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.nanotrader.domain.Quote;
import org.springframework.stereotype.Repository;

@Repository
public interface QuoteRepository extends JpaSpecificationExecutor<Quote>, JpaRepository<Quote, Integer> {
	public Quote findBySymbol(String  symbol);
}
