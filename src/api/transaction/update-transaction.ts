import { UpdatedTransaction } from '@/types/transaction';

export async function updateTransactionApi({
  transactionId,
  updatedTransaction,
}: {
  transactionId: string;
  updatedTransaction: UpdatedTransaction;
}) {
  const apiUrl = `http://localhost:8080/transaction/${transactionId}`;

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTransaction),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error('Could not update transaction');
  }

  const data = await response.json();

  return data;
}
