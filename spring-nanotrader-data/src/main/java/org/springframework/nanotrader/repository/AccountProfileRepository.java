package org.springframework.nanotrader.repository;

import org.springframework.nanotrader.domain.Accountprofile;
import org.springframework.roo.addon.layers.repository.jpa.RooJpaRepository;

@RooJpaRepository(domainType = Accountprofile.class)
public interface AccountProfileRepository {
}
