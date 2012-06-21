package org.springframework.nanotrader.data.repository;

import org.springframework.stereotype.Repository;

@Repository
public interface ChaosProceduresRepository {
	abstract public void killServer();
}