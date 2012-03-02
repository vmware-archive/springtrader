package org.springframework.nanotrader.service;


import java.util.List;

import org.springframework.nanotrader.domain.Account;
import org.springframework.nanotrader.domain.Accountprofile;

public interface AccountProfileService {

	public abstract long countAllAccountProfiles();

	public abstract void deletelAccountProfile(Accountprofile accountProfile);

	public abstract Accountprofile findAccountProfile(Integer id);

	public abstract List<Accountprofile> findAllAccountProfiles();

	public abstract List<Accountprofile> findAccountProfileEntries(int firstResult, int maxResults);

	public abstract void saveAccountProfile(Accountprofile accountProfile);

	public abstract Accountprofile updateAccountProfile(Accountprofile accountProfile);
	
	public abstract Accountprofile findByUseridAndPasswd(String userId, String passwd);
}
