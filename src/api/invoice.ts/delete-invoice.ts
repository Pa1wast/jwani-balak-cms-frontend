export async function deleteInvoiceApi(invoiceId: string) {
  const apiUrl = `http://85.217.171.125:8080/invoice/${invoiceId}`;
  const response = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not delete invoice');
  }

  if (response.status !== 204) {
    const data = await response.json();
    return data;
  }

  return {};
}
