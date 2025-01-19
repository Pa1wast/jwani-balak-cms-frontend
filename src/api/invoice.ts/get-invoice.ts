export async function getInvoices(invoiceId: string) {
  const apiUrl = `http://localhost:8080/invoice/${invoiceId}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get invoice');
  }

  const data = await response.json();

  return data;
}
