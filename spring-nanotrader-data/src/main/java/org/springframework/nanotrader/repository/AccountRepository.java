package org.springframework.nanotrader.repository;

import org.springframework.nanotrader.domain.Account;
import org.springframework.roo.addon.layers.repository.jpa.RooJpaRepository;

@RooJpaRepository(domainType = Account.class)
public interface AccountRepository {
}
