
package org.springframework.nanotrader.data.util;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.Collection;
import java.util.Random;

import org.springframework.nanotrader.data.domain.Holding;

public class FinancialUtils {
	//TO DO: Get rid of nasty static mess
	public final static int ROUND = BigDecimal.ROUND_HALF_UP;
	public final static int SCALE = 2;
	public final static BigDecimal ZERO = (new BigDecimal(0.00))
			.setScale(SCALE);
	public final static BigDecimal ONE = (new BigDecimal(1.00)).setScale(SCALE);
	public final static BigDecimal HUNDRED = (new BigDecimal(100.00))
			.setScale(SCALE);

	private static Random r0 = new Random(System.currentTimeMillis());
	private static Random randomNumberGenerator = r0;

	public static BigDecimal PENNY_STOCK_PRICE;
	public static BigDecimal PENNY_STOCK_RECOVERY_MIRACLE_MULTIPLIER;
	static {
		PENNY_STOCK_PRICE = new BigDecimal(0.01);
		PENNY_STOCK_PRICE = PENNY_STOCK_PRICE.setScale(2,
				BigDecimal.ROUND_HALF_UP);
		PENNY_STOCK_RECOVERY_MIRACLE_MULTIPLIER = new BigDecimal(600.0);
		PENNY_STOCK_RECOVERY_MIRACLE_MULTIPLIER.setScale(2,
				BigDecimal.ROUND_HALF_UP);
	}

	public static BigDecimal MAXIMUM_STOCK_PRICE;
	public static BigDecimal MAXIMUM_STOCK_SPLIT_MULTIPLIER;
	static {
		MAXIMUM_STOCK_PRICE = new BigDecimal(400);
		MAXIMUM_STOCK_PRICE.setScale(2, BigDecimal.ROUND_HALF_UP);
		MAXIMUM_STOCK_SPLIT_MULTIPLIER = new BigDecimal(0.5);
		MAXIMUM_STOCK_SPLIT_MULTIPLIER.setScale(2, BigDecimal.ROUND_HALF_UP);
	}

	public static BigDecimal computeGain(BigDecimal currentBalance,
			BigDecimal openBalance) {
		return currentBalance.subtract(openBalance).setScale(SCALE);
	}

	public static BigDecimal computeGainPercent(BigDecimal currentBalance,
			BigDecimal openBalance) {
		if (openBalance.doubleValue() == 0.0)
			return ZERO;
		BigDecimal gainPercent = currentBalance.divide(openBalance, ROUND)
				.subtract(ONE).multiply(HUNDRED);
		return gainPercent;
	}

	public static BigDecimal computeHoldingsTotal(Collection<Holding> holdings) {
		BigDecimal holdingsTotal = new BigDecimal(0.0).setScale(SCALE);
		if (holdings == null) {
			return holdingsTotal;
		}
		for (Holding holding : holdings) {
			BigDecimal total = holding.getPurchaseprice().multiply(
					holding.getQuantity());
			holdingsTotal = holdingsTotal.add(total);
		}
		return holdingsTotal.setScale(SCALE);
	}

	public static BigDecimal getRandomPriceChangeFactor() {
		// CJB (DAYTRADER-25) - Vary change factor between 1.2 and 0.8
		double percentGain = rndFloat(1) * 0.2;
		if (random() < .5)
			percentGain *= -1;
		percentGain += 1;

		// change factor is between +/- 20%
		BigDecimal percentGainBD = (new BigDecimal(percentGain)).setScale(2,
				BigDecimal.ROUND_HALF_UP);
		if (percentGainBD.doubleValue() <= 0.0)
			percentGainBD = ONE;

		return percentGainBD;
	}

	public static double random() {
		return randomNumberGenerator.nextDouble();
	}

	public static float rndFloat(int i) {
		return (new Float(random() * i)).floatValue();
	}

	public static BigDecimal calculateGainPercentage(BigDecimal gain, BigDecimal totalGains) { 
		BigDecimal percent = new BigDecimal(0);
		percent = gain.divide(totalGains, 4, RoundingMode.HALF_UP);
		percent = percent.multiply(new BigDecimal(100),
					new MathContext(4, RoundingMode.HALF_UP));
		return percent;
	}
	
}



