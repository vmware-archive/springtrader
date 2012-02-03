package org.springframework.nanotrader.repository;

import org.springframework.nanotrader.domain.Order;
import org.springframework.roo.addon.layers.repository.jpa.RooJpaRepository;

@RooJpaRepository(domainType = Order.class)
public interface OrderRepository {
}
