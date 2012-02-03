package org.springframework.nanotrader.repository;

import org.springframework.nanotrader.domain.Holding;
import org.springframework.roo.addon.layers.repository.jpa.RooJpaRepository;

@RooJpaRepository(domainType = Holding.class)
public interface HoldingRepository {
}
