package org.springframework.nanotrader.service.domain;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

/**
 *  Holding
 *  @author Brian Dussault 
 */

public class Holding {
    private Integer holdingid;

    private Set<Order> orders;


    private BigDecimal purchaseprice;

    private BigDecimal quantity;


    private Date purchasedate;

    private Integer accountAccountid;


    private Quote quote;


	public Quote getQuote() {
		return quote;
	}

	public void setQuote(Quote quote) {
		this.quote = quote;
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

	

	public Integer getHoldingid() {
        return this.holdingid;
    }

	public void setHoldingid(Integer id) {
        this.holdingid = id;
    }

	@Override
	public String toString() {
		return "Holding [holdingid=" + holdingid + ", orders=" + orders + ", purchaseprice=" + purchaseprice
				+ ", quantity=" + quantity + ", purchasedate=" + purchasedate + ", accountAccountid="
				+ accountAccountid + "]";
	}
}
