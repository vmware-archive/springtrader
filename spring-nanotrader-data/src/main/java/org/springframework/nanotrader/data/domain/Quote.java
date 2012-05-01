package org.springframework.nanotrader.data.domain;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@SuppressWarnings("serial")
@Entity
@Table(name = "quote")
public class Quote implements Serializable {
	@Id
    @GeneratedValue(strategy = GenerationType.TABLE) //, generator="QUOTE_SEQ")
   // @SequenceGenerator(name="QUOTE_SEQ", sequenceName="QUOTE_SEQUENCE")
    @Column(name = "quoteid")
    private Integer quoteid;

	public Integer getQuoteid() {
        return this.quoteid;
    }

	public void setQuoteid(Integer id) {
        this.quoteid = id;
    }

	@Column(name = "low", precision = 14, scale = 2)
    private BigDecimal low;

	@Column(name = "open1", precision = 14, scale = 2)
    private BigDecimal open1;

	@Column(name = "volume")
    @NotNull
    private BigDecimal volume;

	@Column(name = "price", precision = 14, scale = 2)
    private BigDecimal price;

	@Column(name = "high", precision = 14, scale = 2)
    private BigDecimal high;

	@Column(name = "companyname", length = 250)
    private String companyname;

	@Column(name = "symbol", length = 250, unique = true)
    @NotNull
    private String symbol;

	@Column(name = "change1")
    @NotNull
    private BigDecimal change1;

	public BigDecimal getLow() {
        return low;
    }

	public void setLow(BigDecimal low) {
        this.low = low;
    }

	public BigDecimal getOpen1() {
        return open1;
    }

	public void setOpen1(BigDecimal open1) {
        this.open1 = open1;
    }

	public BigDecimal getVolume() {
        return volume;
    }

	public void setVolume(BigDecimal volume) {
        this.volume = volume;
    }

	public BigDecimal getPrice() {
        return price;
    }

	public void setPrice(BigDecimal price) {
        this.price = price;
    }

	public BigDecimal getHigh() {
        return high;
    }

	public void setHigh(BigDecimal high) {
        this.high = high;
    }

	public String getCompanyname() {
        return companyname;
    }

	public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }

	public String getSymbol() {
        return symbol;
    }

	public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

	public BigDecimal getChange1() {
        return change1;
    }

	public void setChange1(BigDecimal change1) {
        this.change1 = change1;
    }

	@Override
	public String toString() {
		return "Quote [quoteid=" + quoteid + ", low=" + low + ", open1=" + open1 + ", volume=" + volume + ", price="
				+ price + ", high=" + high + ", companyname=" + companyname + ", symbol=" + symbol + ", change1="
				+ change1 + "]";
	}
}
