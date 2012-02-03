package org.springframework.nanotrader.domain;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

@Entity
@Table(schema = "public",name = "accountprofile")
public class Accountprofile {

	public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "profileid")
    private Integer profileid;

	public Integer getProfileid() {
        return this.profileid;
    }

	public void setProfileid(Integer id) {
        this.profileid = id;
    }

	@OneToMany(mappedBy = "profileProfileid")
    private Set<Account> accounts;

	@Column(name = "address", length = 250)
    private String address;

	@Column(name = "passwd", length = 250)
    private String passwd;

	@Column(name = "userid", length = 250, unique = true)
    @NotNull
    private String userid;

	@Column(name = "email", length = 250)
    private String email;

	@Column(name = "creditcard", length = 250)
    private String creditcard;

	@Column(name = "fullname", length = 250)
    private String fullname;

	public Set<Account> getAccounts() {
        return accounts;
    }

	public void setAccounts(Set<Account> accounts) {
        this.accounts = accounts;
    }

	public String getAddress() {
        return address;
    }

	public void setAddress(String address) {
        this.address = address;
    }

	public String getPasswd() {
        return passwd;
    }

	public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

	public String getUserid() {
        return userid;
    }

	public void setUserid(String userid) {
        this.userid = userid;
    }

	public String getEmail() {
        return email;
    }

	public void setEmail(String email) {
        this.email = email;
    }

	public String getCreditcard() {
        return creditcard;
    }

	public void setCreditcard(String creditcard) {
        this.creditcard = creditcard;
    }

	public String getFullname() {
        return fullname;
    }

	public void setFullname(String fullname) {
        this.fullname = fullname;
    }
}
