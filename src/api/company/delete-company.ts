export async function deleteCompanyApi(companyId: string) {
  const apiUrl = `http://localhost:8080/company/${companyId}`;

  const response = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not delete company');
  }

  if (response.status !== 204) {
    const data = await response.json();
    return data;
  }

  return {};
}
