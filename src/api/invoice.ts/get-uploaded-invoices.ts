export async function getUploadedInvoices(companyId: string) {
  const apiUrl = `http://85.217.171.125:8080/uploadedInvoices?companyId=${companyId}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    console.log(response);
    throw new Error('Could not get uploaded invoices');
  }

  const data = await response.json();

  return data;
}
