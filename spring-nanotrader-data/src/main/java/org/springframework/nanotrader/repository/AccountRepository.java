package org.springframework.nanotrader.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.nanotrader.domain.Account;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaSpecificationExecutor<Account>, JpaRepository<Account, Integer> {
	public Account findByProfileProfileid(Account account);

}
