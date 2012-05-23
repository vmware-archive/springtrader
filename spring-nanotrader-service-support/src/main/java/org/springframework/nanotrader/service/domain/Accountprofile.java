package org.springframework.nanotrader.service.domain;


import java.io.Serializable;
import java.util.Map;
import java.util.Set;

/**
 *  Account Profile
 *  @author Brian Dussault 
 */


@SuppressWarnings("serial")
public class Accountprofile implements Serializable{

	private Integer profileid;

    private String address;

    private String passwd;

    private String userid;
	
    private String email;

    private String creditcard;

    private String fullname;

	private Set<Map> accounts;
	
	public Set<Map> getAccounts() {
        return accounts;
    }

	public void setAccounts(Set<Map> accounts) {
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
	
	public Integer getProfileid() {
        return this.profileid;
    }

	public void setProfileid(Integer id) {
        this.profileid = id;
    }
	
    @Override
	public String toString() {
		return "Accountprofile [profileid=" + profileid + ", address=" + address + ", passwd=" + passwd + ", userid="
				+ userid + ", email=" + email + ", creditcard=" + creditcard + ", fullname=" + fullname + "]";
	}
    
}
