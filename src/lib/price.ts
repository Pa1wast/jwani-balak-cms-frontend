import { dataTypes } from '@/types/finance';
import { currencyTypes, Transaction, transactionTypes } from '@/types/transaction';

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

export function calculateFinancials(
  transactions: Transaction[],
  months: number,
  showDataFor: dataTypes
) {
  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.createdAt);
    const currentDate = new Date();
    const diffInMonths =
      (currentDate.getFullYear() - transactionDate.getFullYear()) * 12 +
      (currentDate.getMonth() - transactionDate.getMonth());
    return diffInMonths <= months;
  });

  const expensesData: number[] = [];
  const revenueData: number[] = [];
  const profitsData: number[] = [];

  for (let i = months; i >= 0; i--) {
    const monthStart = new Date();
    monthStart.setMonth(monthStart.getMonth() - i);
    monthStart.setDate(1);
    const monthEnd = new Date(monthStart);
    monthEnd.setMonth(monthStart.getMonth() + 1);
    monthEnd.setDate(0);

    const monthlyTransactions = filteredTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate >= monthStart && transactionDate <= monthEnd;
    });

    // Calculate total expenses (including pricePerUnit * quantity for buy transactions)
    const monthlyExpenses = monthlyTransactions.reduce((total, transaction) => {
      // Include the cost of "buy" transactions
      if (transaction.transactionType.toUpperCase() === 'BUY') {
        const buyExpense = transaction.pricePerUnit * transaction.quantity;
        total += buyExpense;
      }

      // Also include any expenses (if provided in the transaction)
      const expenseTotal =
        transaction.expenses?.reduce((expenseSum, expense) => expenseSum + expense.amount, 0) || 0;
      return total + expenseTotal;
    }, 0);

    // Calculate total revenue (only for SELL transactions)
    const monthlyRevenue = monthlyTransactions.reduce((total, transaction) => {
      if (transaction.transactionType.toUpperCase() === 'SELL') {
        const transactionTotal = transaction.pricePerUnit * transaction.quantity;
        return total + transactionTotal;
      }
      return total;
    }, 0);

    // Ensure profit, revenue, and expenses are never less than zero
    const monthlyProfit = Math.max(0, monthlyRevenue - monthlyExpenses);
    const validMonthlyExpenses = Math.max(0, monthlyExpenses);
    const validMonthlyRevenue = Math.max(0, monthlyRevenue);

    if (showDataFor === dataTypes.EXPENSES || showDataFor === dataTypes.ALL) {
      expensesData.push(validMonthlyExpenses);
    }
    if (showDataFor === dataTypes.REVENUE || showDataFor === dataTypes.ALL) {
      revenueData.push(validMonthlyRevenue);
    }
    if (showDataFor === dataTypes.PROFITS || showDataFor === dataTypes.ALL) {
      profitsData.push(monthlyProfit);
    }
  }

  return {
    expensesData,
    revenueData,
    profitsData,
  };
}

export function calculateTransactionData(
  transactions: Transaction[],
  months: number,
  showDataFor: transactionTypes
) {
  const buyTransactions: number[] = [];
  const sellTransactions: number[] = [];
  const totalTransactions: number[] = [];

  for (let i = months; i >= 0; i--) {
    const monthStart = new Date();
    monthStart.setMonth(monthStart.getMonth() - i);
    monthStart.setDate(1);

    const monthEnd = new Date(monthStart);
    monthEnd.setMonth(monthStart.getMonth() + 1);
    monthEnd.setDate(0);

    const monthlyTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate >= monthStart && transactionDate <= monthEnd;
    });

    const monthlyBuy = monthlyTransactions.filter(
      transaction => transaction.transactionType.toUpperCase() === transactionTypes.BUY
    ).length;

    const monthlySell = monthlyTransactions.filter(
      transaction => transaction.transactionType.toUpperCase() === transactionTypes.SELL
    ).length;

    const monthlyTotal = monthlyTransactions.length;

    if (showDataFor === transactionTypes.BUY || showDataFor === transactionTypes.ALL) {
      buyTransactions.push(monthlyBuy);
    }
    if (showDataFor === transactionTypes.SELL || showDataFor === transactionTypes.ALL) {
      sellTransactions.push(monthlySell);
    }
    if (showDataFor === transactionTypes.ALL) {
      totalTransactions.push(monthlyTotal);
    }
  }

  return { buyTransactions, sellTransactions, totalTransactions };
}

export function getStockQuantity(transactions: Transaction[]) {
  const buyTransactions = transactions.filter(
    transaction => transaction.transactionType.toUpperCase() === transactionTypes.BUY
  );

  const sellTransactions = transactions.filter(
    transaction => transaction.transactionType.toUpperCase() === transactionTypes.SELL
  );

  const quantityBought = buyTransactions.reduce((acc, cur) => acc + cur.quantity, 0);
  const quantitySold = sellTransactions.reduce((acc, cur) => acc + cur.quantity, 0);

  return quantityBought - quantitySold;
}
