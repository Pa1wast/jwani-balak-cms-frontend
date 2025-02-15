export async function deleteUploadedInvoiceApi(uploadedInvoiceId: string) {
  const apiUrl = `http://localhost:8080/uploadedInvoices/${uploadedInvoiceId}`;

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
