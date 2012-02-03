package org.springframework.nanotrader.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.nanotrader.domain.Holding;
import org.springframework.stereotype.Repository;

@Repository
public interface HoldingRepository extends JpaSpecificationExecutor<Holding>, JpaRepository<Holding, Integer> {
}
