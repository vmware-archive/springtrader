package org.springframework.nanotrader.data.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@SuppressWarnings("serial")
@Entity
@Table(schema = "public",name = "accountprofile")
public class Accountprofile implements Serializable {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="ACCOUNTPROFILE_SEQ")
    @SequenceGenerator(name="ACCOUNTPROFILE_SEQ", sequenceName="ACCOUNTPROFILE_SEQUENCE")
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
	
	
	@Column(name = "authtoken", length = 100)
    private String authtoken;

	public String getAuthtoken() {
		return authtoken;
	}

	public void setAuthtoken(String authtoken) {
		this.authtoken = authtoken;
	}

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
	
	@Override
	public String toString() {
		return "Accountprofile [profileid=" + profileid + ", address=" + address + ", passwd=" + passwd + ", userid="
				+ userid + ", email=" + email + ", creditcard=" + creditcard + ", fullname=" + fullname + "]";
	}
}
