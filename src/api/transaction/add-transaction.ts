import { NewTransaction } from '@/types/transaction';

export async function addTransactionApi(newTransaction: NewTransaction) {
  const apiUrl = 'http://85.217.171.125:8080/transaction';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTransaction),
  });

  if (!response.ok) {
    console.log(response, 'not ok');
    throw new Error('Could not add transaction');
  }

  const data = await response.json();

  return data;
}
