package org.springframework.nanotrader.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.nanotrader.domain.Holding;
import org.springframework.stereotype.Repository;

@Repository
public interface HoldingRepository extends JpaSpecificationExecutor<Holding>, JpaRepository<Holding, Integer> {
	
	public List<Holding> findByAccountAccountid(Integer accountId, Pageable pageable);
	
	public Holding findByHoldingidAndAccountAccountid(Integer holdingId, Integer accountId);
	
}
