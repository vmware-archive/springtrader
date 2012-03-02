package org.springframework.nanotrader.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.nanotrader.domain.Accountprofile;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountProfileRepository extends JpaSpecificationExecutor<Accountprofile>, JpaRepository<Accountprofile, Integer> {
	
	public Accountprofile findByUseridAndPasswd(String userId, String passwd);
	
	
}
