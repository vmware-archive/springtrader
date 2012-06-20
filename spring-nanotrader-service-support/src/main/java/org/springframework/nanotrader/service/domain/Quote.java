package org.springframework.nanotrader.service.domain;

import java.math.BigDecimal;

/**
 *  Quote
 *  @author Brian Dussault 
 */

/**
 * @author dussab
 *
 */
public class Quote {


    private Integer quoteid;

    private BigDecimal low;

    private BigDecimal open1;

    private BigDecimal volume;

    private BigDecimal price;

    private BigDecimal high;

    private String companyname;

    private String symbol;

    private BigDecimal change1;

    private int version;
    
   	public int getVersion() {
           return version;
     }
   	
   	
	public void setVersion(int version) {
		this.version = version;
	}


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
	public Integer getQuoteid() {
        return this.quoteid;
    }

	public void setQuoteid(Integer id) {
        this.quoteid = id;
    }

	@Override
	public String toString() {
		return "Quote [quoteid=" + quoteid + ", low=" + low + ", open1="
				+ open1 + ", volume=" + volume + ", price=" + price + ", high="
				+ high + ", companyname=" + companyname + ", symbol=" + symbol
				+ ", change1=" + change1 + "]";
	}
	
}
