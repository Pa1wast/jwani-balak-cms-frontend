import { NewUploadedInvoice } from '@/types/invoice';

export async function uploadInvoiceApi(newUploadedInvoice: NewUploadedInvoice) {
  const apiUrl = 'http://85.217.171.125:8080/uploadedInvoices';

  const formData = new FormData();
  formData.append('company', newUploadedInvoice.company);
  formData.append('name', newUploadedInvoice.name);

  if (!newUploadedInvoice.invoice) throw new Error('Error Uploading invoice? No file provided.');
  formData.append('invoice', newUploadedInvoice.invoice);

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Could not upload invoice');
  }

  const data = await response.json();

  return data;
}
