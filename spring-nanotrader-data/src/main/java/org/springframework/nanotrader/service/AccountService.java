package org.springframework.nanotrader.service;

import java.util.List;
import org.springframework.nanotrader.domain.Account;

public interface AccountService {

	public abstract long countAllAccounts();


	public abstract void deleteAccount(Account account);


	public abstract Account findAccount(Integer id);


	public abstract List<Account> findAllAccounts();


	public abstract List<Account> findAccountEntries(int firstResult, int maxResults);


	public abstract void saveAccount(Account account);


	public abstract Account updateAccount(Account account);
	
	
	public abstract Account findByProfileProfileid(Account account);

}
