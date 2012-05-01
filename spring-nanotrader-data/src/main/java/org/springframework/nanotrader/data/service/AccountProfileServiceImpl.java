package org.springframework.nanotrader.data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.nanotrader.data.domain.Accountprofile;
import org.springframework.nanotrader.data.repository.AccountProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AccountProfileServiceImpl implements AccountProfileService {
	@Autowired
    AccountProfileRepository accountProfileRepository;
	
	@Override
	public long countAllAccountProfiles() {
		return accountProfileRepository.count();
	}

	@Override
	public void deletelAccountProfile(Accountprofile accountProfile) {
		accountProfileRepository.delete(accountProfile);

	}

	@Override
	public Accountprofile findAccountProfile(Integer id) {
		return accountProfileRepository.findOne(id);
	}

	@Override
	public List<Accountprofile> findAllAccountProfiles() {
		return accountProfileRepository.findAll();
	}

	@Override
	public List<Accountprofile> findAccountProfileEntries(int firstResult, int maxResults) {
		 return accountProfileRepository.findAll(new org.springframework.data.domain.PageRequest(firstResult / maxResults, maxResults)).getContent();
		
	}

	@Override
	public void saveAccountProfile(Accountprofile accountProfile) {
		accountProfileRepository.save(accountProfile);

	}

	@Override
	public Accountprofile updateAccountProfile(Accountprofile accountProfile) {
		return accountProfileRepository.save(accountProfile);
	}

	@Override
	public Accountprofile findByUseridAndPasswd(String userId, String passwd) {
		return accountProfileRepository.findByUseridAndPasswd(userId, passwd);
	}

}
