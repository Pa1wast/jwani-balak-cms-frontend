export async function getUploadedInvoices(companyId: string) {
  const apiUrl = `http://localhost:8080/uploadedInvoices?companyId=${companyId}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    console.log(response);
    throw new Error('Could not get uploaded invoices');
  }

  const data = await response.json();

  return data;
}
