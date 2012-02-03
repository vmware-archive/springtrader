package org.springframework.nanotrader.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.nanotrader.domain.Account;
import org.springframework.nanotrader.repository.AccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class AccountServiceImpl implements AccountService {

	@Autowired
    AccountRepository accountRepository;

	public long countAllAccounts() {
        return accountRepository.count();
    }

	public void deleteAccount(Account account) {
        accountRepository.delete(account);
    }

	public Account findAccount(Integer id) {
        return accountRepository.findOne(id);
    }

	public List<Account> findAllAccounts() {
        return accountRepository.findAll();
    }

	public List<Account> findAccountEntries(int firstResult, int maxResults) {
        return accountRepository.findAll(new org.springframework.data.domain.PageRequest(firstResult / maxResults, maxResults)).getContent();
    }

	public void saveAccount(Account account) {
        accountRepository.save(account);
    }

	public Account updateAccount(Account account) {
        return accountRepository.save(account);
    }
}
