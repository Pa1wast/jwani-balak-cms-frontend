export async function getTransactionsByProductId(productId: string) {
  const apiUrl = `http://localhost:8080/transaction?productId=${productId}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get transactions by product ID');
  }

  const data = await response.json();

  return data;
}
