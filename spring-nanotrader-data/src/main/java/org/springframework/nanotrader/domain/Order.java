package org.springframework.nanotrader.domain;

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
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(schema = "public",name = "order")
public class Order {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

	@Column(name = "quote_symbol", length = 250)
    private String quoteSymbol;

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

	public String getQuoteSymbol() {
        return quoteSymbol;
    }

	public void setQuoteSymbol(String quoteSymbol) {
        this.quoteSymbol = quoteSymbol;
    }

	public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
