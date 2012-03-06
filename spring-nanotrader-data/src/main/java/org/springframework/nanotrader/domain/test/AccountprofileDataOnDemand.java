package org.springframework.nanotrader.domain.test;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.nanotrader.domain.Accountprofile;
import org.springframework.nanotrader.repository.AccountProfileRepository;
import org.springframework.stereotype.Component;


@Configurable
@Component
public class AccountprofileDataOnDemand {

	private Random rnd = new SecureRandom();

	private List<Accountprofile> data;
	
	@Autowired
    AccountProfileRepository accountProfileRepository;

	public Accountprofile getNewTransientAccountprofile(int index) {
        Accountprofile obj = new Accountprofile();
        setAddress(obj, index);
        setCreditcard(obj, index);
        setEmail(obj, index);
        setFullname(obj, index);
        setPasswd(obj, index);
        setUserid(obj, index);
        return obj;
    }

	public void setAddress(Accountprofile obj, int index) {
        String address = "address_" + index;
        if (address.length() > 250) {
            address = address.substring(0, 250);
        }
        obj.setAddress(address);
    }

	public void setCreditcard(Accountprofile obj, int index) {
        String creditcard = "creditcard_" + index;
        if (creditcard.length() > 250) {
            creditcard = creditcard.substring(0, 250);
        }
        obj.setCreditcard(creditcard);
    }

	public void setEmail(Accountprofile obj, int index) {
        String email = "foo" + index + "@bar.com";
        if (email.length() > 250) {
            email = email.substring(0, 250);
        }
        obj.setEmail(email);
    }

	public void setFullname(Accountprofile obj, int index) {
        String fullname = "fullname_" + index;
        if (fullname.length() > 250) {
            fullname = fullname.substring(0, 250);
        }
        obj.setFullname(fullname);
    }

	public void setPasswd(Accountprofile obj, int index) {
        String passwd = "passwd_" + index;
        if (passwd.length() > 250) {
            passwd = passwd.substring(0, 250);
        }
        obj.setPasswd(passwd);
    }

	public void setUserid(Accountprofile obj, int index) {
        String userid = "userid_" + index;
        if (userid.length() > 250) {
            userid = new Random().nextInt(10) + userid.substring(1, 250);
        }
        obj.setUserid(userid);
    }

	public Accountprofile getSpecificAccountprofile(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        Accountprofile obj = data.get(index);
        Integer id = obj.getProfileid();
        return accountProfileRepository.findOne(id);
    }

	public Accountprofile getRandomAccountprofile() {
        init();
        Accountprofile obj = data.get(rnd.nextInt(data.size()));
        Integer id = obj.getProfileid();
        return accountProfileRepository.findOne(id);
    }

	public boolean modifyAccountprofile(Accountprofile obj) {
        return false;
    }

	public void init() {
        int from = 0;
        int to = 10;
        data = accountProfileRepository.findAll(new org.springframework.data.domain.PageRequest(from / to, to)).getContent();
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'Accountprofile' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<Accountprofile>();
        for (int i = 0; i < 10; i++) {
            Accountprofile obj = getNewTransientAccountprofile(i);
            try {
                accountProfileRepository.save(obj);
            } catch (ConstraintViolationException e) {
                StringBuilder msg = new StringBuilder();
                for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                    ConstraintViolation<?> cv = iter.next();
                    msg.append("[").append(cv.getConstraintDescriptor()).append(":").append(cv.getMessage()).append("=").append(cv.getInvalidValue()).append("]");
                }
                throw new RuntimeException(msg.toString(), e);
            }
            accountProfileRepository.flush();
            data.add(obj);
        }
    }
}
