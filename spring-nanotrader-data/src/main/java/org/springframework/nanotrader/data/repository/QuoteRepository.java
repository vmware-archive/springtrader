package org.springframework.nanotrader.data.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.nanotrader.data.domain.Quote;
import org.springframework.stereotype.Repository;

@Repository
public interface QuoteRepository extends JpaSpecificationExecutor<Quote>, JpaRepository<Quote, Integer> {
	
	public Quote findBySymbol(String  symbol);
	
	public List<Quote> findBySymbolIn(Set<String> symbols);
	

}
