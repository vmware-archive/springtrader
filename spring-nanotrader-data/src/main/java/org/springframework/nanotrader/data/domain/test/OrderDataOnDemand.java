/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.nanotrader.data.domain.test;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.nanotrader.data.domain.Account;
import org.springframework.nanotrader.data.domain.Holding;
import org.springframework.nanotrader.data.domain.Order;
import org.springframework.nanotrader.data.domain.Quote;
import org.springframework.nanotrader.data.repository.OrderRepository;
import org.springframework.nanotrader.data.service.OrderService;
import org.springframework.stereotype.Component;


@Component
@Configurable
public class OrderDataOnDemand {

	private Random rnd = new SecureRandom();

	private List<Order> data;

	@Autowired
    private AccountDataOnDemand accountDataOnDemand;

	@Autowired
    private HoldingDataOnDemand holdingDataOnDemand;

	@Autowired
	private QuoteDataOnDemand quoteDataOnDemand;

	@Autowired
    OrderService orderService;

	@Autowired
    OrderRepository orderRepository;

	public Order getNewTransientOrder(int index) {
        Order obj = new Order();
        setAccountAccountid(obj, index);
        setCompletiondate(obj, index);
        setHoldingHoldingid(obj, index);
        setOpendate(obj, index);
        setOrderfee(obj, index);
        setOrderstatus(obj, index);
        setOrdertype(obj, index);
        setPrice(obj, index);
        setQuantity(obj, index);
        setQuote(obj, index);
        return obj;
    }

	public void setAccountAccountid(Order obj, int index) {
        Account accountAccountid = accountDataOnDemand.getRandomAccount();
        obj.setAccountAccountid(accountAccountid);
    }

	public void setCompletiondate(Order obj, int index) {
        Date completiondate = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setCompletiondate(completiondate);
    }

	public void setHoldingHoldingid(Order obj, int index) {
        Holding holdingHoldingid = holdingDataOnDemand.getRandomHolding();
        obj.setHoldingHoldingid(holdingHoldingid);
    }

	public void setOpendate(Order obj, int index) {
        Date opendate = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setOpendate(opendate);
    }

	public void setOrderfee(Order obj, int index) {
        BigDecimal orderfee = BigDecimal.valueOf(index);
        if (orderfee.compareTo(new BigDecimal("999999999999.99")) == 1) {
            orderfee = new BigDecimal("999999999999.99");
        }
        obj.setOrderfee(orderfee);
    }

	public void setOrderstatus(Order obj, int index) {
        String orderstatus = "orderstatus_" + index;
        if (orderstatus.length() > 250) {
            orderstatus = orderstatus.substring(0, 250);
        }
        obj.setOrderstatus(orderstatus);
    }

	public void setOrdertype(Order obj, int index) {
        String ordertype = "ordertype_" + index;
        if (ordertype.length() > 250) {
            ordertype = ordertype.substring(0, 250);
        }
        obj.setOrdertype(ordertype);
    }

	public void setPrice(Order obj, int index) {
        BigDecimal price = BigDecimal.valueOf(index);
        if (price.compareTo(new BigDecimal("999999999999.99")) == 1) {
            price = new BigDecimal("999999999999.99");
        }
        obj.setPrice(price);
    }

	public void setQuantity(Order obj, int index) {
        BigDecimal quantity = BigDecimal.valueOf(index);
        obj.setQuantity(quantity);
    }

	public void setQuote(Order obj, int index) {
        Quote quote = quoteDataOnDemand.getRandomQuote();
        obj.setQuote(quote);
    }

	public Order getSpecificOrder(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        Order obj = data.get(index);
        Integer id = obj.getOrderid();
        return orderService.findOrder(id);
    }

	public Order getRandomOrder() {
        init();
        Order obj = data.get(rnd.nextInt(data.size()));
        Integer id = obj.getOrderid();
        return orderService.findOrder(id);
    }

	public boolean modifyOrder(Order obj) {
        return false;
    }

	public void init() {
        int from = 0;
        int to = 10;
        data = orderService.findOrderEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'Order' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<Order>();
        for (int i = 0; i < 10; i++) {
            Order obj = getNewTransientOrder(i);
            try {
                orderService.saveOrder(obj);
            } catch (ConstraintViolationException e) {
                StringBuilder msg = new StringBuilder();
                for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                    ConstraintViolation<?> cv = iter.next();
                    msg.append("[").append(cv.getConstraintDescriptor()).append(":").append(cv.getMessage()).append("=").append(cv.getInvalidValue()).append("]");
                }
                throw new RuntimeException(msg.toString(), e);
            }
            orderRepository.flush();
            data.add(obj);
        }
    }
}
