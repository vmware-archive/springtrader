package org.springframework.nanotrader.service;

import java.util.List;
import org.springframework.nanotrader.domain.Order;

public interface OrderService {

	public abstract long countAllOrders();


	public abstract void deleteOrder(Order order);


	public abstract Order findOrder(Integer id);


	public abstract List<Order> findAllOrders();


	public abstract List<Order> findOrderEntries(int firstResult, int maxResults);


	public abstract void saveOrder(Order order);


	public abstract Order updateOrder(Order order);

}
