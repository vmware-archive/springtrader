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
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@SuppressWarnings("serial")
@Entity
@Table(name = "holding")
public class Holding implements Serializable {
	@Id
    @GeneratedValue(strategy = GenerationType.TABLE) 
    @Column(name = "holdingid")
    private Integer holdingid;

	public Integer getHoldingid() {
        return this.holdingid;
    }

	public void setHoldingid(Integer id) {
        this.holdingid = id;
    }

	@OneToMany(mappedBy = "holdingHoldingid")
    private Set<Order> orders;

	@Column(name = "purchaseprice", precision = 14, scale = 2)
    private BigDecimal purchaseprice;

	@Column(name = "quantity", precision = 14, scale = 0)
    @NotNull
    private BigDecimal quantity;

	@Column(name = "purchasedate")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(style = "M-")
    private Date purchasedate;

	@Column(name = "account_accountid")
    private Integer accountAccountid;

	@Column(name = "quote_symbol", length = 250)
    private String quoteSymbol;

	public Set<Order> getOrders() {
        return orders;
    }

	public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

	public BigDecimal getPurchaseprice() {
        return purchaseprice;
    }

	public void setPurchaseprice(BigDecimal purchaseprice) {
        this.purchaseprice = purchaseprice;
    }

	public BigDecimal getQuantity() {
        return quantity;
    }

	public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

	public Date getPurchasedate() {
        return purchasedate;
    }

	public void setPurchasedate(Date purchasedate) {
        this.purchasedate = purchasedate;
    }

	public Integer getAccountAccountid() {
        return accountAccountid;
    }

	public void setAccountAccountid(Integer accountAccountid) {
        this.accountAccountid = accountAccountid;
    }

	public String getQuoteSymbol() {
        return quoteSymbol;
    }

	public void setQuoteSymbol(String quoteSymbol) {
        this.quoteSymbol = quoteSymbol;
    }

	@Override
	public String toString() {
		return "Holding [holdingid=" + holdingid + ", purchaseprice=" + purchaseprice + ", quantity=" + quantity
				+ ", purchasedate=" + purchasedate + ", quoteSymbol=" + quoteSymbol + "]";
	}

	
}
