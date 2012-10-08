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
package org.springframework.nanotrader.data.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@SuppressWarnings("serial")
@Entity
@Table(name = "orders")
@org.hibernate.annotations.Entity(dynamicUpdate=true)
public class Order implements Serializable {
	@Id
    @GeneratedValue(strategy = GenerationType.TABLE) 
    @Column(name = "orderid")
    private Integer orderid;

	public Integer getOrderid() {
        return this.orderid;
    }

	public void setOrderid(Integer id) {
        this.orderid = id;
    }

	@ManyToOne
    @JoinColumn(name = "account_accountid", referencedColumnName = "accountid")
    private Account accountAccountid;

	@ManyToOne 
    @JoinColumn(name = "holding_holdingid", referencedColumnName = "holdingid")
    private Holding holdingHoldingid;

	@Column(name = "orderfee", precision = 14, scale = 2)
    private BigDecimal orderfee;

	@Column(name = "completiondate")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(style = "M-")
    private Date completiondate;

	@Column(name = "ordertype", length = 250)
    private String ordertype;

	@Column(name = "orderstatus", length = 250)
    private String orderstatus;

	@Column(name = "price", precision = 14, scale = 2)
    private BigDecimal price;

	@Column(name = "quantity")
    @NotNull
    private BigDecimal quantity;

	@Column(name = "opendate")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(style = "M-")
    private Date opendate;
	
	@ManyToOne 
	@JoinColumn(name = "quote_symbol", referencedColumnName = "symbol")
    private Quote quote;



	public Account getAccountAccountid() {
        return accountAccountid;
    }

	public void setAccountAccountid(Account accountAccountid) {
        this.accountAccountid = accountAccountid;
    }

	public Holding getHoldingHoldingid() {
        return holdingHoldingid;
    }

	public void setHoldingHoldingid(Holding holdingHoldingid) {
        this.holdingHoldingid = holdingHoldingid;
    }

	public BigDecimal getOrderfee() {
        return orderfee;
    }

	public void setOrderfee(BigDecimal orderfee) {
        this.orderfee = orderfee;
    }

	public Date getCompletiondate() {
        return completiondate;
    }

	public void setCompletiondate(Date completiondate) {
        this.completiondate = completiondate;
    }

	public String getOrdertype() {
        return ordertype;
    }

	public void setOrdertype(String ordertype) {
        this.ordertype = ordertype;
    }

	public String getOrderstatus() {
        return orderstatus;
    }

	public void setOrderstatus(String orderstatus) {
        this.orderstatus = orderstatus;
    }

	public BigDecimal getPrice() {
        return price;
    }

	public void setPrice(BigDecimal price) {
        this.price = price;
    }

	public BigDecimal getQuantity() {
        return quantity;
    }

	public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

	public Date getOpendate() {
        return opendate;
    }

	public void setOpendate(Date opendate) {
        this.opendate = opendate;
    }



	public Quote getQuote() {
		return quote;
	}

	public void setQuote(Quote quote) {
		this.quote = quote;
	}

	@Override
	public String toString() {
		return "Order [orderid=" + orderid + ", orderfee=" + orderfee + ", completiondate=" + completiondate
				+ ", ordertype=" + ordertype + ", orderstatus=" + orderstatus + ", price=" + price + ", quantity="
				+ quantity + ", opendate=" + opendate + "]";
	}

	
}
