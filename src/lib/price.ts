import { currencyTypes } from '@/types/transaction';

export function formatPrice(price: number, currency: currencyTypes): string {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return currency === currencyTypes.IQD ? `${formattedPrice} IQD` : `$${formattedPrice}`;
}

export function formatPercentage(value: number, total: number): string {
  if (total === 0) {
    throw new Error('Total must not be zero to avoid division by zero.');
  }

  const percentage = (value / total) * 100;

  return `${percentage.toFixed(2)}%`;
}

export function calculateProfit(
  profitMargin: number,
  sellingPrice: number,
  totalCost: number
): { info?: string; error?: string; warn?: string; value: number } {
  if (profitMargin < 0 || profitMargin > 100) {
    return { error: 'Profit margin should be a percentage between 0 and 100.', value: 0 };
  }

  if (sellingPrice <= 0) {
    return { info: 'No selling price is set.', value: 0 };
  }

  if (totalCost <= 0) {
    return { error: 'Total cost must be greater than zero.', value: 0 };
  }

  const profitAmount = sellingPrice - totalCost;

  if (profitAmount < 0) {
    return { warn: 'Negative profit detected, indicating a loss.', value: profitAmount };
  }

  const targetProfit = totalCost * (profitMargin / 100);
  if (profitAmount < targetProfit) {
    return {
      warn: 'Selling price is too low to meet the target profit margin.',
      value: profitAmount,
    };
  }

  const profitMarginDecimal = profitMargin / 100;
  const adjustedProfit = profitAmount * profitMarginDecimal;

  return { value: adjustedProfit };
}
