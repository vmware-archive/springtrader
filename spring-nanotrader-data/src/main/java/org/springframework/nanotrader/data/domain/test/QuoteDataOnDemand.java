package org.springframework.nanotrader.data.domain.test;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.nanotrader.data.domain.Quote;
import org.springframework.nanotrader.data.repository.QuoteRepository;
import org.springframework.nanotrader.data.service.QuoteService;
import org.springframework.stereotype.Component;


@Component
@Configurable
public class QuoteDataOnDemand {

	private Random rnd = new SecureRandom();

	private List<Quote> data;

	@Autowired
    QuoteService quoteService;

	@Autowired
    QuoteRepository quoteRepository;

	public Quote getNewTransientQuote(int index) {
        Quote obj = new Quote();
        setChange1(obj, index);
        setCompanyname(obj, index);
        setHigh(obj, index);
        setLow(obj, index);
        setOpen1(obj, index);
        setPrice(obj, index);
        setSymbol(obj, index);
        setVolume(obj, index);
        return obj;
    }

	public void setChange1(Quote obj, int index) {
        BigDecimal change1 = BigDecimal.valueOf(index);
        obj.setChange1(change1);
    }

	public void setCompanyname(Quote obj, int index) {
        String companyname = "companyname_" + index;
        if (companyname.length() > 250) {
            companyname = companyname.substring(0, 250);
        }
        obj.setCompanyname(companyname);
    }

	public void setHigh(Quote obj, int index) {
        BigDecimal high = BigDecimal.valueOf(index);
        if (high.compareTo(new BigDecimal("999999999999.99")) == 1) {
            high = new BigDecimal("999999999999.99");
        }
        obj.setHigh(high);
    }

	public void setLow(Quote obj, int index) {
        BigDecimal low = BigDecimal.valueOf(index);
        if (low.compareTo(new BigDecimal("999999999999.99")) == 1) {
            low = new BigDecimal("999999999999.99");
        }
        obj.setLow(low);
    }

	public void setOpen1(Quote obj, int index) {
        BigDecimal open1 = BigDecimal.valueOf(index);
        if (open1.compareTo(new BigDecimal("999999999999.99")) == 1) {
            open1 = new BigDecimal("999999999999.99");
        }
        obj.setOpen1(open1);
    }

	public void setPrice(Quote obj, int index) {
        BigDecimal price = BigDecimal.valueOf(index);
        if (price.compareTo(new BigDecimal("999999999999.99")) == 1) {
            price = new BigDecimal("999999999999.99");
        }
        obj.setPrice(price);
    }

	public void setSymbol(Quote obj, int index) {
        String symbol = "symbol_" + index;
        if (symbol.length() > 250) {
            symbol = new Random().nextInt(10) + symbol.substring(1, 250);
        }
        obj.setSymbol(symbol);
    }

	public void setVolume(Quote obj, int index) {
        BigDecimal volume = BigDecimal.valueOf(index);
        obj.setVolume(volume);
    }

	public Quote getSpecificQuote(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        Quote obj = data.get(index);
        Integer id = obj.getQuoteid();
        return quoteService.findQuote(id);
    }

	public Quote getRandomQuote() {
        init();
        Quote obj = data.get(rnd.nextInt(data.size()));
        Integer id = obj.getQuoteid();
        return quoteService.findQuote(id);
    }

	public boolean modifyQuote(Quote obj) {
        return false;
    }

	public void init() {
        int from = 0;
        int to = 10;
        data = quoteService.findQuoteEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'Quote' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<Quote>();
        for (int i = 0; i < 10; i++) {
            Quote obj = getNewTransientQuote(i);
            try {
                quoteService.saveQuote(obj);
            } catch (ConstraintViolationException e) {
                StringBuilder msg = new StringBuilder();
                for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                    ConstraintViolation<?> cv = iter.next();
                    msg.append("[").append(cv.getConstraintDescriptor()).append(":").append(cv.getMessage()).append("=").append(cv.getInvalidValue()).append("]");
                }
                throw new RuntimeException(msg.toString(), e);
            }
            quoteRepository.flush();
            data.add(obj);
        }
    }
}
