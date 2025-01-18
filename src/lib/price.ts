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

export function calculateProfit(profitMargin: number, totalCost, sellingPrice) {}
