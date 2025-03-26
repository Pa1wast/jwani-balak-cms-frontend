import { API_URL } from '@/lib/api-url';
import { UpdatedTransaction } from '@/types/transaction';

export async function updateBuyTransactionApi({
  transactionId,
  updatedTransaction,
}: {
  transactionId: string;
  updatedTransaction: UpdatedTransaction;
}) {
  const apiUrl = `${API_URL}/buyTransaction/${transactionId}`;

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTransaction),
  });

  if (!response.ok) {
    throw new Error('Could not update buy transaction');
  }

  const data = await response.json();

  return data;
}

export async function updateSellTransactionApi({
  transactionId,
  updatedTransaction,
}: {
  transactionId: string;
  updatedTransaction: UpdatedTransaction;
}) {
  const apiUrl = `${API_URL}/sellTransaction/${transactionId}`;

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTransaction),
  });

  if (!response.ok) {
    throw new Error('Could not update sell transaction');
  }

  const data = await response.json();

  return data;
}
