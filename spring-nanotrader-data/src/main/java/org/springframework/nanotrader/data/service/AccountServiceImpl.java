/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.nanotrader.data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.nanotrader.data.domain.Account;
import org.springframework.nanotrader.data.repository.AccountRepository;
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
