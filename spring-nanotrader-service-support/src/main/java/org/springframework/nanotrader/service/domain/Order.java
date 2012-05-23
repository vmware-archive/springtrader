package org.springframework.nanotrader.service.domain;

import java.math.BigDecimal;
import java.util.Date;
/**
 *  Order
 *  @author Brian Dussault 
 */
public class Order {

	private Integer orderid;

	private Integer accountid;
	
	private Integer holdingid;

	private BigDecimal orderfee;

	private Date completiondate;

	private String ordertype;

	private String orderstatus;

	private BigDecimal price;

	private BigDecimal quantity;

	private Date opendate;

	private Quote quote;

	public Integer getOrderid() {
		return this.orderid;
	}

	public void setOrderid(Integer id) {
		this.orderid = id;
	}


	public Integer getAccountid() {
		return accountid;
	}

	public void setAccountid(Integer accountId) {
		this.accountid = accountId;
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

	public Integer getHoldingid() {
		return holdingid;
	}

	public void setHoldingid(Integer holdingid) {
		this.holdingid = holdingid;
	}


	@Override
	public String toString() {
		return "Order [orderid=" + orderid + ", accountid=" + accountid
				+ ", holdingid=" + holdingid + ", orderfee=" + orderfee
				+ ", completiondate=" + completiondate + ", ordertype="
				+ ordertype + ", orderstatus=" + orderstatus + ", price="
				+ price + ", quantity=" + quantity + ", opendate=" + opendate
				+ ", quote=" + quote + "]";
	}
}
