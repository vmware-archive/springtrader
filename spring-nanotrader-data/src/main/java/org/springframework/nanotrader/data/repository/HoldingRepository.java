package org.springframework.nanotrader.data.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.nanotrader.data.domain.Holding;
import org.springframework.stereotype.Repository;

@Repository
public interface HoldingRepository extends JpaSpecificationExecutor<Holding>, JpaRepository<Holding, Integer> {
	
	public List<Holding> findByAccountAccountid(Integer accountId, Pageable pageable);
	
	public Holding findByHoldingidAndAccountAccountid(Integer holdingId, Integer accountId);
	
	@Query("SELECT count(h) FROM Holding h WHERE h.accountAccountid = ?1")
	public Long findCountOfHoldings(Integer accountId);
	
}
