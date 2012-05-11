package org.springframework.nanotrader.data.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.nanotrader.data.domain.Order;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>, JpaSpecificationExecutor<Order> {
		
	@Modifying 
	@Transactional
	@Query(value="UPDATE Order o SET o.orderstatus = 'completed' WHERE  o.orderid IN (SELECT o2 FROM Order o2 WHERE o2.orderstatus = 'closed' AND o2.accountAccountid.accountid  = ?1)")
	public int updateClosedOrders(Integer accountId);
	
	@Query("SELECT o FROM Order o WHERE o.orderstatus = ?2 AND o.accountAccountid.accountid  = ?1 order by orderid DESC")
	public List<Order> findOrdersByStatus(Integer accountId, String status, Pageable pageable);

	@Query("SELECT o FROM Order o WHERE o.accountAccountid.accountid  = ?1 order by orderid DESC")
	public List<Order> findOrdersByAccountAccountid_Accountid(Integer accountId, Pageable pageable);

	@Query("SELECT o FROM Order o WHERE o.orderid = ?1 AND o.accountAccountid.accountid  = ?2")
	public Order findByOrderidAndAccountAccountid(Integer orderId, Integer accountId);

	@Query("SELECT count(o) FROM Order o WHERE o.accountAccountid.accountid  = ?1")
	public Long findCountOfOrders(Integer accountId);
	
	@Query("SELECT count(o) FROM Order o WHERE o.accountAccountid.accountid  = ?1 and o.orderstatus = ?2")
	public Long findCountOfOrders(Integer accountId, String status);
	
}
