package org.springframework.nanotrader.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.nanotrader.data.domain.Account;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaSpecificationExecutor<Account>, JpaRepository<Account, Integer> {
	
}
