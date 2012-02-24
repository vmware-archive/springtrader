package org.springframework.nanotrader.util;

import java.math.BigDecimal;
import java.util.Collection;

import org.springframework.nanotrader.domain.Holding;

public class FinancialUtils {

	public final static int ROUND = BigDecimal.ROUND_HALF_UP;
	public final static int SCALE = 2;
	public final static BigDecimal ZERO = (new BigDecimal(0.00)).setScale(SCALE);
	public final static BigDecimal ONE = (new BigDecimal(1.00)).setScale(SCALE);
	public final static BigDecimal HUNDRED = (new BigDecimal(100.00)).setScale(SCALE);

	public static BigDecimal computeGain(BigDecimal currentBalance, BigDecimal openBalance) {
		return currentBalance.subtract(openBalance).setScale(SCALE);
	}

	public static BigDecimal computeGainPercent(BigDecimal currentBalance, BigDecimal openBalance) {
		if (openBalance.doubleValue() == 0.0)
			return ZERO;
		BigDecimal gainPercent = currentBalance.divide(openBalance, ROUND).subtract(ONE).multiply(HUNDRED);
		return gainPercent;
	}

	public static BigDecimal computeHoldingsTotal(Collection<Holding> holdings) {
		BigDecimal holdingsTotal = new BigDecimal(0.0).setScale(SCALE);
		if (holdings == null) {
			return holdingsTotal;
		}
		for (Holding holding : holdings) {
			BigDecimal total = holding.getPurchaseprice().multiply(holding.getQuantity());
			holdingsTotal = holdingsTotal.add(total);
		}
		return holdingsTotal.setScale(SCALE);
	}

}
