export async function getTransactions(companyId: string) {
  const apiUrl = `http://localhost:8080/transaction?companyId=${companyId}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get transactions');
  }

  const data = await response.json();

  return data;
}
