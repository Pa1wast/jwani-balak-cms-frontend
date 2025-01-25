export async function getInvoices(companyId: string, page = 1, limit = 10000) {
  const apiUrl = `http://localhost:8080/invoice?companyId=${companyId}&page=${page}&limit=${limit}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    console.log(response);
    throw new Error('Could not get invoices');
  }

  const data = await response.json();

  return data;
}
