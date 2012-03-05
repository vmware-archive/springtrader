package org.springframework.nanotrader.domain;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.nanotrader.repository.HoldingRepository;
import org.springframework.stereotype.Component;


@Component
@Configurable
public class HoldingDataOnDemand {

	private Random rnd = new SecureRandom();

	private List<Holding> data;

	@Autowired
    HoldingRepository holdingRepository;

	public Holding getNewTransientHolding(int index) {
        Holding obj = new Holding();
        setAccountAccountid(obj, index);
        setPurchasedate(obj, index);
        setPurchaseprice(obj, index);
        setQuantity(obj, index);
        setQuoteSymbol(obj, index);
        return obj;
    }

	public void setAccountAccountid(Holding obj, int index) {
        Integer accountAccountid = new Integer(index);
        obj.setAccountAccountid(accountAccountid);
    }

	public void setPurchasedate(Holding obj, int index) {
        Date purchasedate = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setPurchasedate(purchasedate);
    }

	public void setPurchaseprice(Holding obj, int index) {
        BigDecimal purchaseprice = BigDecimal.valueOf(index, 2);
        if (purchaseprice.compareTo(new BigDecimal("999999999999.99")) == 1) {
            purchaseprice = new BigDecimal("999999999999.99");
        }
        obj.setPurchaseprice(purchaseprice);
    }

	public void setQuantity(Holding obj, int index) {
        BigDecimal quantity = BigDecimal.valueOf(index);
        obj.setQuantity(quantity);
    }

	public void setQuoteSymbol(Holding obj, int index) {
        String quoteSymbol = "quoteSymbol_" + index;
        if (quoteSymbol.length() > 250) {
            quoteSymbol = quoteSymbol.substring(0, 250);
        }
        obj.setQuoteSymbol(quoteSymbol);
    }

	public Holding getSpecificHolding(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        Holding obj = data.get(index);
        Integer id = obj.getHoldingid();
        return holdingRepository.findOne(id);
    }

	public Holding getRandomHolding() {
        init();
        Holding obj = data.get(rnd.nextInt(data.size()));
        Integer id = obj.getHoldingid();
        return holdingRepository.findOne(id);
    }

	public boolean modifyHolding(Holding obj) {
        return false;
    }

	public void init() {
        int from = 0;
        int to = 10;
        data = holdingRepository.findAll(new org.springframework.data.domain.PageRequest(from / to, to)).getContent();
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'Holding' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<Holding>();
        for (int i = 0; i < 10; i++) {
            Holding obj = getNewTransientHolding(i);
            try {
                holdingRepository.save(obj);
            } catch (ConstraintViolationException e) {
                StringBuilder msg = new StringBuilder();
                for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                    ConstraintViolation<?> cv = iter.next();
                    msg.append("[").append(cv.getConstraintDescriptor()).append(":").append(cv.getMessage()).append("=").append(cv.getInvalidValue()).append("]");
                }
                throw new RuntimeException(msg.toString(), e);
            }
            holdingRepository.flush();
            data.add(obj);
        }
    }
}
