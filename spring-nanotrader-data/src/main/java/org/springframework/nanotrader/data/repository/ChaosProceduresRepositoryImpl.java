package org.springframework.nanotrader.data.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

/**
 * Chaos monkey repository - SQLFire Java stored procedure
 * which terminates SQLFire JVM
 * 
 * @author Brian Dussault
 */

@Repository
public class ChaosProceduresRepositoryImpl implements ChaosProceduresRepository {

	@PersistenceContext
	private EntityManager em;

	public void setEntityManager(EntityManager em) {
		this.em = em;
	}
	

	@Override
	public void killServer() { 
		Query q = em.createNativeQuery(" { call CHAOSFUNCTION() };");
        q.executeUpdate();
	}
}
