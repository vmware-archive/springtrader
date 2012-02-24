package org.springframework.nanotrader.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@SuppressWarnings("serial")
@Entity
@Table(schema = "public",name = "account")
public class Account implements Serializable {

	@OneToMany(mappedBy = "accountAccountid")
    private Set<Order> orders;

	@ManyToOne
    @JoinColumn(name = "profile_profileid", referencedColumnName = "profileid")
    private Accountprofile profileProfileid;

	@Column(name = "creationdate")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(style = "M-")
    private Date creationdate;

	@Column(name = "openbalance", precision = 14, scale = 2)
    private BigDecimal openbalance;

	@Column(name = "logoutcount")
    @NotNull
    private Integer logoutcount;

	@Column(name = "balance", precision = 14, scale = 2)
    private BigDecimal balance;

	@Column(name = "lastlogin")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(style = "M-")
    private Date lastlogin;

	@Column(name = "logincount")
    @NotNull
    private Integer logincount;

	public Set<Order> getOrders() {
        return orders;
    }

	public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

	public Accountprofile getProfileProfileid() {
        return profileProfileid;
    }

	public void setProfileProfileid(Accountprofile profileProfileid) {
        this.profileProfileid = profileProfileid;
    }

	public Date getCreationdate() {
        return creationdate;
    }

	public void setCreationdate(Date creationdate) {
        this.creationdate = creationdate;
    }

	public BigDecimal getOpenbalance() {
        return openbalance;
    }

	public void setOpenbalance(BigDecimal openbalance) {
        this.openbalance = openbalance;
    }

	public Integer getLogoutcount() {
        return logoutcount;
    }

	public void setLogoutcount(Integer logoutcount) {
        this.logoutcount = logoutcount;
    }

	public BigDecimal getBalance() {
        return balance;
    }

	public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

	public Date getLastlogin() {
        return lastlogin;
    }

	public void setLastlogin(Date lastlogin) {
        this.lastlogin = lastlogin;
    }

	public Integer getLogincount() {
        return logincount;
    }

	public void setLogincount(Integer logincount) {
        this.logincount = logincount;
    }

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="ACCOUNT_SEQ")
    @SequenceGenerator(name="ACCOUNT_SEQ", sequenceName="ACCOUNT_SEQUENCE")
    @Column(name = "accountid")
    private Integer accountid;

	public Integer getAccountid() {
        return this.accountid;
    }

	public void setAccountid(Integer id) {
        this.accountid = id;
    }

	@Override
	public String toString() {
		return "Account [creationdate=" + creationdate + ", openbalance=" + openbalance + ", logoutcount="
				+ logoutcount + ", balance=" + balance + ", lastlogin=" + lastlogin + ", logincount=" + logincount
				+ ", accountid=" + accountid + "]";
	}


}
