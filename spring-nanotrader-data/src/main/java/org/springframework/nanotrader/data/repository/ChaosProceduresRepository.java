package org.springframework.nanotrader.data.repository;

import org.springframework.stereotype.Repository;

/**
 * Chaos monkey repository
 * 
 * @author Brian Dussault
 */

@Repository
public interface ChaosProceduresRepository {
	abstract public void killServer();
}