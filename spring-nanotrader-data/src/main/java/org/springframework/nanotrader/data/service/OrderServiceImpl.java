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
