package org.springframework.nanotrader.data.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.nanotrader.data.domain.Order;
import org.springframework.nanotrader.data.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class OrderServiceImpl implements OrderService {

	@Autowired
    OrderRepository orderRepository;
	
	public long countAllOrders() {
        return orderRepository.count();
    }

	public void deleteOrder(Order order) {
        orderRepository.delete(order);
    }

	public Order findOrder(Integer id) {
        return orderRepository.findOne(id);
    }

	public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

	public List<Order> findOrderEntries(int firstResult, int maxResults) {
        return orderRepository.findAll(new org.springframework.data.domain.PageRequest(firstResult / maxResults, maxResults)).getContent();
    }

	public void saveOrder(Order order) {
        orderRepository.save(order);
    }

	public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }
}
