import { NewInvoice } from '@/types/invoice';

export async function addInvoiceApi(newInvoice: NewInvoice) {
  const apiUrl = 'http://85.217.171.125:8080/invoice';

  console.log(newInvoice);

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newInvoice),
  });

  if (!response.ok) {
    throw new Error('Could not add invoice');
  }

  const data = await response.json();

  return data;
}
