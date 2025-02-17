export async function getTransaction(transactionId: string) {
  const apiUrl = `http://85.217.171.125:8080/transaction/${transactionId}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get transaction');
  }

  const data = await response.json();

  return data;
}
