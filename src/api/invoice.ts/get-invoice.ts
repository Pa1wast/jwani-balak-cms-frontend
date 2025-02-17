export async function getInvoice(invoiceId: string) {
  const apiUrl = `http://85.217.171.125:8080/invoice/${invoiceId}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get invoice');
  }

  const data = await response.json();

  return data;
}
