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

import org.springframework.nanotrader.data.domain.Order;

public interface OrderService {

	public abstract long countAllOrders();


	public abstract void deleteOrder(Order order);

	public abstract Order findOrder(Integer id);


	public abstract List<Order> findAllOrders();


	public abstract List<Order> findOrderEntries(int firstResult, int maxResults);


	public abstract void saveOrder(Order order);


	public abstract Order updateOrder(Order order);

}
